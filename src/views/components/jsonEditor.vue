<template>
  <div class="components-container">
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/components/tinymceDemo' }">components</el-breadcrumb-item>
        <el-breadcrumb-item>JSON Editor</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    
    <el-card>
      <div class="json-editor">
        <textarea ref="textarea" v-model="editorValue"/>
      </div>
    </el-card>
  </div>
</template>
<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
require('script-loader!jsonlint')
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

export default {
  name:'jsonEditor',
  props: ['value'],
  data() {
    return {
      jsonEditor: false,
      editorValue:`[
  {
    "items": [
      {
        "market_type": "forexdata",
        "symbol": "XAUUSD"
      },
      {
        "market_type": "forexdata",
        "symbol": "UKOIL"
      },
      {
        "market_type": "forexdata",
        "symbol": "CORN"
      }
    ],
    "name": ""
  },
  {
    "items": [
      {
        "market_type": "forexdata",
        "symbol": "XAUUSD"
      },
      {
        "market_type": "forexdata",
        "symbol": "XAGUSD"
      },
      {
        "market_type": "forexdata",
        "symbol": "AUTD"
      },
      {
        "market_type": "forexdata",
        "symbol": "AGTD"
      }
    ],
    "name": "贵金属"
  },
  {
    "items": [
      {
        "market_type": "forexdata",
        "symbol": "CORN"
      },
      {
        "market_type": "forexdata",
        "symbol": "WHEAT"
      },
      {
        "market_type": "forexdata",
        "symbol": "SOYBEAN"
      },
      {
        "market_type": "forexdata",
        "symbol": "SUGAR"
      }
    ],
    "name": "农产品"
  },
  {
    "items": [
      {
        "market_type": "forexdata",
        "symbol": "UKOIL"
      },
      {
        "market_type": "forexdata",
        "symbol": "USOIL"
      },
      {
        "market_type": "forexdata",
        "symbol": "NGAS"
      }
    ],
    "name": "能源化工"
  }
]
`
    }
  },

  watch: {
    value(value) {
      const editorValue = this.jsonEditor.getValue()
      if (value !== editorValue) {
        this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
      }
    }
  },
  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      lint: true
    })

    this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
    this.jsonEditor.on('change', cm => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    })
  },
  methods: {
    getValue() {
      return this.jsonEditor.getValue()
    }
  }
}
</script>

<style scoped>
.json-editor{
  height: 100%;
  position: relative;
}
.json-editor >>> .CodeMirror {
  height: auto;
  min-height: 300px;
}
.json-editor >>> .CodeMirror-scroll{
  min-height: 300px;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
  color: #F08047;
}
</style>