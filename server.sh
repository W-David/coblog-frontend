#!/bin/bash
server_opt() {
	echo '开始备份'
	echo '跳转到 ~/nginx-static/temp'
	cd ~/nginx-static/temp
	if [ -f 'dist.zip' ]
	then
		current_time=$(date '+%Y%m%d%H')
		echo '存在dist.zip文件'
		echo "生成文件 dist.zip.${current_time}"
		cp ./dist.zip ./pkg/dist.zip.${current_time}
		if [ -e 'dist' ]
		then
			echo '删除已存在的dist文件夹'
			rm -rf ./dist
		fi
		echo '解压dist.zip文件'
		unzip ./dist.zip
		echo '删除dist.zip文件'
		rm ./dist.zip
	fi
	if [ -e 'dist' ]
	then 
		echo '存在dist文件夹'
		echo '跳转到 ~/nginx-static/web'
		cd ~/nginx-static/web
		echo '删除旧的静态文件'
		rm -rf ./coblog
		echo '放置新的静态文件'
		mv ~/nginx-static/temp/dist ./
		mv dist coblog
	fi
	echo '获取nginx进程号'
	pid=$(ps -ef | grep nginx | grep master | grep -v grep | awk '{print $2}')
	echo "nginx进程号为: ${pid}"
	echo '重启nginx进程'
	kill -HUP ${pid}
}

echo '开始部署'
server_opt
echo '部署完成'