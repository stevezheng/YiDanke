create table if not exists `yi_do_task` (
    `id` int(11) unsigned not null auto_increment,
    `doTaskStatus` tinyint(2) not null comment '任务状态: -1:撤销, 0:创建成功, 1:完成任务, 2:添加发货单， 3：商家发货， 4：买手收货并好评， 5：商家退款， 6：买手确认退款',
    `doTaskTerminal` varchar(6) not null comment '任务平台: pc:电脑, phone: 手机',
    `doTaskUserId` int(11) not null comment '任务用户id',
    `doTaskTaskId` int(11) not null comment '任务id',
    `doTaskShopId` int(11) not null comment '店铺id',
    `doTaskShopName` varchar(32) not null comment '店铺名称',
    `doTaskAccountId` int(11) not null comment '任务买手id',
    `doTaskAccountName` varchar(32) not null comment '任务买手名称',
    `doTaskKeyword` varchar(32) not null default '' comment '任务关键词',
    `doTaskFee` decimal(10,2) not null default '0' comment '任务佣金',
    `doTaskExtendFee` decimal(10, 2) not null default '0' comment '任务加赏佣金',
    `doTaskComment` varchar(512) not null default '' comment '备注信息',
    `doTaskCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;