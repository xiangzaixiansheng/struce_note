

# 设置清华镜像
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/


# 创建虚拟环境
conda create -n env_name python=3.8


查看所有的虚拟环境
conda env list
conda info -e
conda info --envs

conda activate name(虚拟环境名字)（进入到该虚拟环境中）


# 导出conda环境

#获得环境中的所有配置
conda env export --name myenv > myenv.yml
#重新还原环境
conda env create -f  myenv.yml

# 查看是否安装某个包
conda list pkgname