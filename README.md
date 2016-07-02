# ar-drone

要说现在很潮的玩具有哪些？里面一定有无人机。出去探险要用无人机、拍毕业照要用无人机，就连求婚也会用到无人机（笑

接触ruff之后，觉得逼格最高的玩法就是用ruff来控制无人机了，嗯，ruff无人机遥控器，简直酷炫

现在我来介绍一下这个无人机遥控器项目

我们使用到的无人机是parrot公司出品的ar drone 2.0，市售2000软妹币

这个无人机有以下操作：
起飞、降落，悬停
水平面上的前进、后退、向左飞、向右飞
垂直面上的上升、下降、顺时针转、逆时针转

这么算一算，我们一共需要11个物理按键
正好，ruff上面一共最多也只能接11个物理按键，这冥冥之中说明ruff和无人机就是绝配啊，哈哈

ruff使用wifi控制无人机。无人机开启之后，会自己建立一个热点，ruff连接到这个热点之后，就可以通过wifi来控制无人机了


原理介绍完了，我们就来实际试一下吧



我们要打造一款独一无二、精致的遥控器

![controller](http://i2.piimg.com/4851/0446836e9d7f9e58.png)

##注意

这个项目的wifi配置和其它项目不同，详见第三步，连接硬件

##硬件要求

1.[ar drone 2.0(Model ar-drone)](https://rap.ruff.io/raps/ar-drone)

2.11x[Push Button Module(Model:CK002)](https://rap.ruff.io/raps/button-gpio)

3.[Ruff开发板](http://detail.koudaitong.com/show/goods?alias=35wmug7n0nrzf)

4.杜邦线等

##软件需求

1.[Ruff SDK](https://ruff.io/zh-cn/docs/download.html)

2.[Ruff 固件](https://ruff.io/zh-cn/docs/download.html)

3.[软件包仓库](https://rap.ruff.io/)

##让我们开始吧

###第一步：下载安装 Ruff 开发包

+你可以到[这里](https://ruff.io/zh-cn/docs/download.html)下载 Ruff 的开发包。

+解压缩安装包，假定路径为 your-ruff-directory

+添加环境变量，设置 RUFF_HOME 和 PATH 。

如果你使用的是Windows 系统(推荐Win10），可以这样做

    +使用小娜搜索“编辑系统环境变量"，回车

    +点击“环境变量”

    +新建RUFF_HOME环境变量，地址为你解压的ruff sdk的文件夹

    +新建PATH环境变量，地址为解压的ruff sdk的文件夹下的bin文件夹

如果你使用的是 Linux 或 Mac 系统，可以这样做：

    export RUFF_HOME=your-ruff-directory

    export PATH="$PATH:$RUFF_HOME/bin"

在命令行里，键入如下命令

    rap version

如果你能看到 rap 的版本信息，恭喜你，设置成功了！

Ruff 开发包主要提供了如下命令：

+ruff，Ruff 运行时环境，可以执行 JavaScript 程序。

+rap，一个生产力提升工具，提供了从包管理到应用部署等方面的支持。

###第二步：创建项目

在你希望创建项目的目录下，使用 rap 创建项目

    rap init app

根据提示，填写相应内容，一切顺利的话，一个新的目录就创建出来了，我们的项目就在其中，rap 还会为我们下载
开发板的配置信息，并生成缺省的硬件配置信息。
进入到新建的目录中，我们的 Ruff 之旅将正式开始。

###第三步：连接硬件

+将 Ruff 开发板接上电源

+硬件启动需要一段时间，大约30秒左右，请耐心等待。如果你是第一次使用，则会看到红灯闪烁，它表示等待网络配置中。

+配置网络连接，这里采用的是无线网络配置的方式。由于ar drone 2的wifi比较独特，我们需要使用使用串口来配置wifi.

1. 串口登陆到板子（需要有[串口驱动](https://ruff.io/zh-cn/docs/network-configuration.html),MAC安装screen,win7可以用串口工具打开，如putty、Xshell） 

    screen /dev/cu.usbserial 57600,cs8,-cstopb,-parity,-crtscts  

2. 修改WIFI 配置 vi /etc/config/wireless 

修改之前   

    config wifi-device  radio0
            option type     mac80211
            option channel  11
            option hwmode   11g
            option path     '10180000.wmac'
            option htmode   HT20
            # REMOVE THIS LINE TO ENABLE WIFI:
            option disabled 1

    config wifi-iface
            option device   radio0
            option network  lan
            option mode     ap
            option ssid     OpenWrt
            option encryption none
修改之后       
      
    config wifi-device  radio0  
            option type     mac80211  
            option channel  11  
            option hwmode   11g  
            option path     '10180000.wmac'  
            option htmode   HT20  
            # REMOVE THIS LINE TO ENABLE WIFI:  
            option disabled '0'  

    config wifi-iface  
            option device   radio0  
            option network 'wwan'  
            option mode 'sta'  
            option encryption 'mixed-psk'  
            option ssid “ardrone2” //此处的ardrone2为你的ardrone无人机建立的热点ssid
 
 3. 启动dhcp服务，
    vi /etc/config/network 

改成
	
    config interface 'wwan'
            option proto 'dhcp'

4. 此时ruff连接上了ardrone2.0的wifi热点
        
        
   

+扫描开发板地址，运行下面的命令

    rap scan

你会看到开发板的地址显示在命令行里，假定为 your_hareware_ip 。

    Scanning (this will take 10 seconds)...
    *[unnamed] - your-hareware-ip

如果有多个设备，选择一个其中一个， rap 会记住这个地址，便于后续操作。根据 rap 的提示，你可以给开发板设置一个 ID ，
做后续的标识。使用下面这个命令，就可以设置开发板的 ID 了。

    rap rename your-hardware-id

###第四步：添加外设

添加小车，运行如下命令：

    rap device add drone

这里的 drone 就是我们在应用中用以操作设备的 ID，该命令会提示我们输入设备型号。根据标签上的信息，
光照传感器模块的型号是ar-drone。然后，rap 会根据外设型号，去寻找相应的驱动。

添加按键

    rap device add button


###第五步：硬件布局

有了外设的相关信息，我们要完成硬件布局以及连接的工作。

+硬件布局，运行如下命令：

    rap layout

rap 会给我们自动计算出硬件的布局，也就是连接方式。

我们也可以使用图形化的版本，运行如下命令：

    rap layout --visual

请根据给出的布局方式进行硬件连接。

*注意：请在断掉电源的情况下完成硬件连接，之后，再重新插上电源。*

###第六步：编写代码

+按照 src 目录下的 index.js编写代码

###第七步：日志与部署

为了更好地了解应用的运行状态，我们可以查看日志。

+打开另外一个窗口，进入应用所在的目录，启动日志，运行如下命令：

    rap log

 接下来，就要部署应用了。如前所示，我们可以用 deploy 和 start 命令将应用运行在开发板上。我们也可以使用一个简化的命令，一次完成这个操作。
+部署并启动应用，运行如下命令：

    rap deploy -s

从应用部署到开发板到稳定运行可能还需要有一段时间。稍等一下，就可以尝试击打震动传感器，看看RGB LED 是否点亮。如果出现任何问题，可以查看日志定位问题。

怎么样，有趣吗？想了解更多 Ruff 开发的细节，请到[这里](https://ruff.io/zh-cn/docs/development-steps.html)。


