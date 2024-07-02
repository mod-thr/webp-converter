import { randomBytes } from 'crypto'

export const imageExt = ['png', 'jpg', 'jpeg', 'webp']

export const createNewName = (name) => {
    const arr = name.split('.')
    arr.pop()
    const hash = randomBytes(8).toString('hex')
    return arr.join('.') + '-' + hash + '.webp'
}

export const getPercentage = (total, current) => {
    return (100 / total) * current
}

export const getPercentageDifference = (largeFileSize, smallFileSize) => {
    if (largeFileSize === 0) {
        return "Cannot calculate percentage difference when large file size is zero.";
    }
    const difference = largeFileSize - smallFileSize;

    return (difference / largeFileSize) * 100;
}

export const formatFileSize = (size) => {
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}