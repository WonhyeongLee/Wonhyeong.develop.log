/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const visit = require('unist-util-visit');

function WrapImagePlugin() {
  return markdownAST => {
    const imageNodes = [];
    // AST 트리를 순회하며 paragraph 노드를 방문
    visit(markdownAST, 'paragraph', (node, index, parent) => {
      if (node.children && Array.isArray(node.children)) {
        // paragraph 노드의 자식들 중 image 노드를 찾는다.
        const images = node.children.filter(child => child.type === 'image');
        if (images.length > 0) {
          images.forEach(image => imageNodes.push(image));
          // 이미지 노드 앞뒤로 <div class="image-wrapper">를 추가
          const wrappedImages = node.children.map(child => {
            if (child.type === 'image') {
              return {
                type: 'html',
                value: `<div class="image-wrapper"><img src="${child.url}" alt="${child.alt}" /></div>`,
              };
            }
            return child;
          });

          // 부모 노드를 <div class="image-container">로 감싸기
          const containerNode = {
            type: 'html',
            value: `<div class="image-container">${wrappedImages.map(child => child.value).join('')}</div>`,
          };
          // 현재 paragraph 노드를 containerNode로 교체
          parent.children.splice(index, 1, containerNode);
        }
      }
    });
    return markdownAST;
  };
}

module.exports = WrapImagePlugin;
