

// 把 packages 目录下所有包都进行打包

const fs = require('fs');
const execa = require("execa") //开启子进程

const target = 'reactivity'

build(target)
// 对我们目标进行依次打包，并行打包。
async function build(target) {
  await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {
    stdio: 'inherit' // 当子进程打包的信息共享给父进程
  });
}

