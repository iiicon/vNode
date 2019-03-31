/**
 * @author GerritV
 * @description 虚拟 DOM Demo
 * @todo 暂时不考虑复杂情况
 */

 class VNode {
   constructor(tag, children, text) {
     this.tag = tag
     this.children = children
     this.text = text
   }

   render() {
     if (this.tag === '#text') {
       return document.createTextNode(this.text)
     }
     let el = document.createElement(this.tag)
     this.children.forEach(item => {
       el.appendChild(item.render())
     });
     return el
   }
 }

function v(tag, children, text) {
  if (typeof children === 'string') {
    text = children
    children = []
  }
  return new VNode(tag, children, text)
}

let vNodes = v('div', [
  v('p', [
    v('span', [v('#text', 'baidu.com')])
  ]
  ),
  v('span', [
    v('#text', 'joyowo.com')
  ])
]
)
console.log(vNodes.render())

function patchElement(parent, newNode, oldNode, index=0) {
  if (!oldNode) {
    parent.appendChild(newNode.render())
  } else if (!newNode) {
    parent.removeChild(parent.childNodes[index])
  } else if (newNode.tag !== oldNode.tag || newNode.text !== oldNode.text) {
    parent.replaceChild(newNode.render(), parent.childNodes[index])
  } else {
    for (let i = 0; i < newVNode.children.length || i < oldVNode.children.length; i++) {
      patchElement(parent.childNodes[index], newVNode.children[i], oldVNode.children[i], i)
    }
  }
}

var vNodes1 = v('div',[], 'hello,world')

const root = document.querySelector('#root')
patchElement(root, vNodes1)
