import path from 'path'

import { loadConfig } from '@/utils'
import mhyConfig from '@/configs/mhy'

const _globalTypes = path.resolve(__dirname, '../../../node_modules', '@types')
const _cwdTypes = path.join(process.cwd(), 'node_modules', '@types')

const tsconfig = loadConfig('typescript', {
    compilerOptions: {
        module: 'esNext',
        target: 'esnext',
        moduleResolution: 'node',
        allowJs: false,
        emitDeclarationOnly: true,
        strict: true,
        jsx: 'preserve',
        resolveJsonModule: true,
        esModuleInterop: true,
        noImplicitAny: false,
        declaration: true,
        baseUrl: path.resolve(process.cwd(), mhyConfig.srcFolder),
        skipLibCheck: true,
        paths: Object.entries(mhyConfig.defaultAliases).reduce(
            function(acc, [k]) {
                let folder = k.replace('@', ``)
                folder = folder ? `${folder}/` : ''
                acc[k] = [`${folder}index`]
                acc[`${k}/*`] = [`${folder}*`]
                return acc
            },
            {
                '*': [path.resolve(process.cwd(), 'node_modules', '*'), path.resolve(_globalTypes, '../', '*')]
            }
        ),
        typeRoots: [_globalTypes, _cwdTypes]
    },
    include: [path.resolve(process.cwd(), `${mhyConfig.srcFolder}/**/*`)],
    files: [path.resolve(__dirname, './mhy.d.ts')]
})

export default tsconfig
