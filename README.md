#### For change theme color
######update app color 
open src/style/global/_variable.scss
update app color```$app-primary and $secondary``` variable value
and also update ``primary and secondary`` in src/container/themes/_defaultTheme.js
file

######update sidebar color 

 open src/style/global/_variable.scss
 update following variables
``
$sidebar-bg, 
$sidebar-text-color,   
$sidebar-bg-darken, 
$sidebar-hover-color
``

######for dark theme 
add dark-theme on body tag
uncomment ``
@import "colorTheme/_color-theme-dir"; `` in 
 src/style/app.scss
also paste code from src/container/themes/darkTheme.js in src/container/themes/defaultTheme.js
file
