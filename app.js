import sharp from 'sharp'
import sizeOf from 'image-size'
import Parse from 'args-parser'
import fs from 'fs'
import { createNewName, formatFileSize, getPercentageDifference, imageExt } from './src/helper.js'
import path from 'path'

const flags = Parse(process.argv)

const dir = flags.dir || process.cwd()
const files = fs.readdirSync(dir)

if (flags.resolution) {
    const d = flags.resolution.split('*')
    flags.width = d[0]
    flags.height = d[1]
}

let totalFileSize = 0
let totalConvertSize = 0
let totalFiles = 0
const start = new Date()

for (const file of files) {
    const ext = file.split('.').pop()
    if (imageExt.includes(ext)) {
        const compressionStart = new Date()
        const p = path.join(dir, file)
        const stat = fs.statSync(p)
        const newName = createNewName(file)
        const dest = path.join(flags.dest || dir, newName)
        const dimensions = sizeOf(p)

        const output = await sharp(p)
            .resize({
                width: flags.width || dimensions.width || 1000,
                height: flags.height || dimensions.height || 1000,
                fit: flags.fit || 'cover',
                position: flags.position || 'center'
            }).webp({
                quality: flags.quality || 85
            }).toFile(dest)

        totalFileSize += stat.size
        totalConvertSize += output.size
        totalFiles += 1

        const compressionEnd = new Date()

        console.table({
            'Initial size': formatFileSize(stat.size),
            'Output size': formatFileSize(output.size),
            'Initial name': file,
            'Output name': newName,
            'Compressed': Math.round(getPercentageDifference(stat.size, output.size)) + '%',
            'Time': compressionEnd.getTime() - compressionStart.getTime() + ' ms'
        })
    }
}

const end = new Date()

console.log('------------- Compression process finished -------------');
console.table({
    'Total files compressed': totalFiles,
    'Total file sizes read': formatFileSize(totalFileSize),
    'Total file size written': formatFileSize(totalConvertSize),
    'Total compressed': Math.round(getPercentageDifference(totalFileSize, totalConvertSize)) + '%',
    'Total time taken': end.getTime() - start.getTime() + ' ms'
})