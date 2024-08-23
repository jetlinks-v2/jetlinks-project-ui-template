import type Monaco from 'monaco-editor';
export const findMatches = (editor: any, paths: string[]) =>{
    let matches = []
    let count = 0

    while (!matches.length && count !== paths.length) {
        matches = editor.getModel().findMatches(paths[count])
        console.log(matches)
        count += 1
    }

    return matches
}
