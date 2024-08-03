// @ts-nocheck
import * as fs from 'fs'
import * as path from 'path'
import type { Plugin } from 'vite'

const permissionsFilePath = path.resolve(process.cwd() + '/app/Enums/Permissions.php')

const typeOutputPath =  path.resolve(process.cwd() + '/resources/js/types/Permission.ts')

export default function typescriptPermissionsPlugin(): Plugin {
    return {
        name: 'typescript-permissions-plugin',
        configureServer(server) {

            server.watcher.on('change', function (path) {
                if (path !== permissionsFilePath) return

                writeTypescriptInterface()
            })
        },

    }
}

function writeTypescriptInterface() {
    const contents = fs.readFileSync(permissionsFilePath).toString();

    const matches = Array.from(contents.matchAll(/(?<=case) *(\w+) *= *'(.*)'/g))

    let ts = 'export enum Permission {\n'

    for(const [match, name, value] of matches) {
        ts += `    ${name} = '${value}',\n`
    }

    ts += '}\n'

    fs.writeFileSync(typeOutputPath, ts)
}
