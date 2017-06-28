import os
import shutil
import stat
#permissions
#Clear directory
for file in os.listdir("./upload"):
    os.remove(os.path.join("./upload",file))
#Add all javascript files to directory
for root, dirs, files in os.walk("./Screep_modules"):
    for file in files:
        if file.endswith(".js"):
            shutil.copy(os.path.join(root,file),"./upload")