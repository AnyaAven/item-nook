import { exec } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

export class WebpackZiggyCompilePlugin {
    constructor(options) {
        const defaultOptions = {
            routes: [
                './routes',
            ],
            output: {
                path: 'resources/js/ziggy.js',
                types: false,
            },
        }

        if (typeof options !== 'object') {
            options = defaultOptions
        }

        this.options = { ...defaultOptions, ...options }

        this.routes = new Set()

        this.options.routes.map((route) => {
            const resolvedRoute = path.resolve(route)
            const isDir = fs.lstatSync(resolvedRoute).isDirectory()

            if (isDir) {
                this.getAllFiles(resolvedRoute).map(x => {
                    this.routes.add(x)
                })
            } else {
                this.routes.add(resolvedRoute)
            }
        })

    }

    apply(compiler) {
        compiler.hooks.afterCompile.tapAsync('WebpackZiggyCompilePlugin', (compilation, callback) => {
            Array.from(this.routes).map(file => {
                compilation.fileDependencies.add(file)
            })

            callback()
        })

        compiler.hooks.watchRun.tap('WebpackZiggyCompilePlugin', (watching) => {
            if (!watching.modifiedFiles) return

            let ziggyChange = false

            Array.from(this.routes).map(route => {
                if (watching.modifiedFiles.has(route)) {
                    ziggyChange = true
                }
            })

            if (ziggyChange && watching.name === 'client') {
                console.log('Compiling ziggy...')
                exec(
                    `php artisan ziggy:generate ${this.options.output.types ? '--types' : ''} ${this.options.output.path}`,
                    (error, stdout, stderr) => console.log(stdout),
                )
            }

        })
    }

    getAllFiles(dirPath, arrayOfFiles) {
        // Initialize the array if it's not provided
        arrayOfFiles = arrayOfFiles || []

        // Read the contents of the directory
        const files = fs.readdirSync(dirPath)

        files.forEach((file) => {
            // Get the full path of the current file/directory
            const fullPath = path.join(dirPath, file)

            // Check if the current path is a directory
            if (fs.statSync(fullPath).isDirectory()) {
                // Recursively call the function for the subdirectory
                this.getAllFiles(fullPath, arrayOfFiles)
            } else {
                // If it's a file, push it to the array
                arrayOfFiles.push(fullPath)
            }
        })

        return arrayOfFiles
    }
}
