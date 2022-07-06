from PIL import Image
import os
import time


uri = 'mixed/'
save_folder = 'unclassified'

def crop(path):
    img = Image.open(path)
    w, h = img.size
    width = w//3
    name = time.time()
    for i in range(3):
        start = width*i
        box = (start, 0, start+width, h)
        t = img.crop(box)
        t.save('%s/%s_%s.png' % (save_folder, name, i))

if not os.path.exists(save_folder):
    os.mkdir(save_folder)

for file in os.listdir(uri):
    crop(uri + file)

print('Ejecución completada, no volver a ejecutar mientras las carpetas existan')
