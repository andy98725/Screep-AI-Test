import os
import shutil
#print("yes")
for root, dirs, files in os.walk("./Screep_modules"):
    #print(files)
    for file in files:
        #print(os.path.join(root,file))
        if file.endswith(".js"):
            shutil.copy(os.path.join(root,file),"./upload")
            #print(os.path.join(root,file))