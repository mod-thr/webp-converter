**WEBP image compressor and converter**

Convert and compress every images in a directory to webp

start with clone the repository:

    git clone https://github.com/mod-thr/webp-converter.git

navigate to directory:

    cd webp-converter

install dependencies:

    npm install

list of flags that you can pass to app:

| Flag | Description | default value |
|--|--|--|
| `--dir` | required - the directory that your images are |
| `--dest` | the destination directory that you want to save your files | dir directory |
| `--quality` | your output image quality, min: `0`, max: `100` | `85` |
| `--width` | webp image width | source width |
| `--height` | webp image height | source height |
| `--resolution` | webp image resolution separated by `*` like `1280*720` | source resolution |
| `--fit` | How the image should be resized/cropped to fit the target dimension(s), one of `cover`, `contain`, `fill`, `inside` or `outside`. | `cover` |


there is an command example that converts image in `dogs` directory:

    node app.js --dir=/tmp/dogs --dest=/tmp/dogs/out




 
