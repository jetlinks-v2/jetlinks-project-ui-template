<template>
  <div class="monaco-editor-container" ref="editorElement">

  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import { loadGrammars, loadTheme } from 'monaco-volar';
import * as monaco from 'monaco-editor';
import { setupMonaco, loadOnigasm } from './monacoSetup'

defineOptions({ name: 'MonacoEditorVolar'})

const props = defineProps({
  value: {
    type: String
  }
})

const emits = defineEmits(['update:value'])
const editorElement = ref()
let editorInstance

const init = (theme) => {
  const model = monaco.editor.createModel(props.value, 'vue', monaco.Uri.parse('file:///files/demo.vue'));
  editorInstance = monaco.editor.create(editorElement.value, {
    theme,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    minimap: {
      enabled: false
    },
    inlineSuggest: {
      enabled: false
    },
    'semanticHighlighting.enabled': true
  });

  editorInstance.setModel(model);

  const t = editorInstance._themeService._theme;
  t.getTokenStyleMetadata = (type, modifiers, _language) => {
    const _readonly = modifiers.includes('readonly');
    switch (type) {
      case 'function':
      case 'method':
        return { foreground: 12 };
      case 'class':
        return { foreground: 11 };
      case 'variable':
      case 'property':
        return { foreground: _readonly ? 21 : 9 };
      default:
        return { foreground: 0 };
    }
  };

  loadGrammars(monaco, editorInstance);

  editorInstance.onDidChangeModelContent(() => {
    //
    const value = editorInstance.getValue();
    nextTick(() => {
      emits('update:value', value);
    });
  });

  editorFormat()
}

const loadPlugin = async () => {
  Promise.all([setupMonaco(), loadOnigasm(), loadTheme(monaco.editor)]).then(
    ([, , theme]) => {
      init(theme.dark);
    }
  );
}

const editorFormat = () => {
  if (!editorInstance) return;
  editorInstance.getAction('editor.action.formatDocument')?.run();
}

const insertValue = (val, position) => {
  if (!editorInstance) return;
  const _position = position || editorInstance.getPosition();
  const value = editorInstance.getValue();
  console.log(_position)

  editorInstance.executeEdits(value, [
    {
      range: new monaco.Range(
        _position?.lineNumber,
        _position?.column,
        _position?.lineNumber,
        _position?.column,
      ),
      text: val,
    },
  ]);
}

const updateValue = (val) => {
  const position = toRaw(editorInstance).getPosition();
  editorInstance.setValue(val);
  editorInstance.setPosition(position);
  editorFormat()
}

onMounted(() => {
  loadPlugin()
})

defineExpose({
  insertValue,
  updateValue,
  getInstance: () => editorInstance
})

</script>

<style lang="less">
.monaco-editor-container {
  width: 100%;
  height: 100%;

  .monaco-editor,
  .preview.inline,
  .overflow-guard {
    height: 100% !important;
    width: 100% !important;
  }
}
</style>
