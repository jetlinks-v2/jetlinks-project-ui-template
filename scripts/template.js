const fs = require('fs')
const path = require('path')
const minimist = require('minimist')
const { program } = require('commander');
const inquirer = require('inquirer')
const ProgressBar = require('progress');
const { generateIndexVueContent, createMenu }  = require('./moduleContent')

const createModule = async (modulesDir, inquirerData) => {
    const { name, moduleName } = inquirerData;
    // 创建模块
    const targetDir = path.join(modulesDir, name);

    fs.mkdirSync(targetDir, { recursive: true });
    // 复制模板文件
    const templateDir = path.join(__dirname, 'template', 'module');
    fs.cpSync(templateDir, targetDir, { recursive: true });

    // 替换模板中的占位符
    const files = fs.readdirSync(targetDir, { recursive: true });
    const bar = new ProgressBar('替换模板占位符 [:bar] :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: files.length
    });

    for (const file of files) {
        const filePath = path.join(targetDir, file);
        if (fs.statSync(filePath).isFile()) {
            let content = fs.readFileSync(filePath, 'utf-8');
            content = content.replace(/\${module-id}/g, name)
                            .replace(/\${module-name}/g, moduleName);
            fs.writeFileSync(filePath, content, 'utf-8');
        }
        bar.tick();
    }
}

const createPage = async (modules, inquirerData) => {
    const { name, hasSearch, hasTable, moduleName } = inquirerData;

    // 创建页面
    if (modules.length === 0) {
        throw new Error('没有找到可用模块，请先创建模块');
    }

    // 选择模块
    const { selectedModule } = await inquirer.default.prompt([
        {
            type: 'list',
            name: 'selectedModule',
            message: '请选择要创建页面的模块:',
            choices: modules.map(m => ({ name: `${m.name} (${m.id})`, value: m }))
        }
    ]);

    // 创建views目录
    const viewsDir = path.join(selectedModule.path, 'views');
    if (!fs.existsSync(viewsDir)) {
        fs.mkdirSync(viewsDir, { recursive: true });
        console.log(`创建views目录: ${viewsDir}`);
    }

    // 创建页面目录
    const pageDir = path.join(viewsDir, name);
    if (fs.existsSync(pageDir)) {
        throw new Error(`页面目录 ${name} 已存在`);
    }
    fs.mkdirSync(pageDir, { recursive: true });

    // 生成index.vue文件内容
    const indexVueContent = await generateIndexVueContent(hasSearch, hasTable, name);
    const indexVuePath = path.join(pageDir, 'index.vue');
    fs.writeFileSync(indexVuePath, indexVueContent, 'utf-8');

    // 复制模板文件
    const templateDir = path.join(__dirname, 'template', 'page');
    await fs.cpSync(templateDir, pageDir, { recursive: true });

    // 修改baseMenu.json
    const baseMenuPath = path.join(selectedModule.path, 'baseMenu.json');
    const baseMenu = JSON.parse(fs.readFileSync(baseMenuPath, 'utf-8'));
    const pageIndex = baseMenu.findIndex(m => m.code === name);
    const newMenu = createMenu(name, moduleName, pageIndex !== -1 ? pageIndex : baseMenu.length + 1);

    if (pageIndex !== -1) {
        baseMenu[pageIndex] = newMenu;
    } else {
        baseMenu.push(newMenu);
    }

    fs.writeFileSync(baseMenuPath, JSON.stringify(baseMenu, null, 2), 'utf-8');
}

const getModule = async(modulesDir) => {

    // 获取所有模块
    return fs.readdirSync(modulesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => {
            const modulePath = path.join(modulesDir, dirent.name);
            const packageJsonPath = path.join(modulePath, 'package.json');
            if (fs.existsSync(packageJsonPath)) {
                const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
                return {
                    id: pkg.id || dirent.name,
                    path: modulePath,
                    name: dirent.name
                };
            }
            return null;
        })
        .filter(Boolean);
}

program
    .command('create')
    .description('开始创建模板')
    .action(async (options) => {
        console.log(options)
        const inquirerData = {}
        const pkNameReg = /^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/
        // 执行操作
        const modulesDir = path.join(process.cwd(), 'src', 'modules');
        const modules = await getModule(modulesDir);

        // 第一步：选择类型
        const {type} = await inquirer.default.prompt([
            {
                type: 'list',
                name: 'type',
                message: '选择类型:',
                choices: ['module', 'page'],
            },
        ]);

        inquirerData.type = type
        const isModule = type === 'module'
        const typeName = isModule ? '模块ID' : '页面Code'

        // 第二步：输入名称
        const {name} = await inquirer.default.prompt([
            {
                type: 'input',
                name: 'name',
                message: `输入${typeName}:`,
                validate: (input) => {
                    if (input) {
                        if (pkNameReg.test(input) === false) {
                            return `模块id只能必须以小写字母（a-z）或数字（0-9）开头，‌不能以 . 或 -‌ 开头,必须以小写字母或数字结尾，‌不能以 . 或 -‌ 结尾`
                        }
                        if (isModule && modules.some(m => m.id === input)) {
                            return `模块id【${input}】重复`
                        }
                        return true
                    }
                    return `${typeName}不能为空`
                },
            },
        ]);
        inquirerData.name = name

        const {moduleName} = await inquirer.default.prompt([
            {
                type: 'input',
                name: 'moduleName',
                message: `输入${isModule ? '模块' : '页面'}名称:`,
                validate: (input) => ( input ? true : `${isModule ? '模块' : '页面'}名称不能为空`),
            },
        ])
        inquirerData.moduleName = moduleName

        if (!isModule) {
            const { hasSearch } = await inquirer.default.prompt([
                {
                    type: 'confirm',
                    name: 'hasSearch',
                    message: '是否需要搜索功能:',
                    default: true,
                },
            ])
            inquirerData.hasSearch = hasSearch

            const { hasTable } = await inquirer.default.prompt([
                {
                    type: 'confirm',
                    name: 'hasTable',
                    message: '是否需要表格功能:',
                    default: true,
                },
            ])
            inquirerData.hasTable = hasTable
        }

        try {
            // 确保modules目录存在
            if (!fs.existsSync(modulesDir)) {
                fs.mkdirSync(modulesDir, { recursive: true });
                console.log(`创建modules目录: ${modulesDir}`);
            }

            if (isModule) {
                await createModule(modulesDir, inquirerData)
            } else {
                await createPage(modules, inquirerData)
            }
        } catch (error) {
            console.error('创建失败:', error.message);
            process.exit(1);
        }
    })

program.parse(process.argv);
