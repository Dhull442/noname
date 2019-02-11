  url=$1
httpurl="https://$url"
wget --page-requisites --html-extension --convert-links --restrict-file-names=windows --no-parent $httpurl
ls $url >> cache.txt
mv $url/* .
