```sql
-- 昵称库表
CREATE TABLE tongxue.`default_nickname` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '记录Id',
  `STATUS` INT(1) DEFAULT '0' COMMENT '昵称被使用状态: 0未被占用, 1已被占用',
  `NICK_NAME` char(20) NOT NULL COMMENT '默认昵称',
  `CREATE_DATE` datetime DEFAULT NULL COMMENT '创建时间',
  `UPDATE_DATE` datetime DEFAULT NULL COMMENT '更新时间',
  `VERSION` int DEFAULT '0' COMMENT '记录版本',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `NICK_NAME` (`NICK_NAME`),
  KEY `INDEX_pickname_status` (`STATUS`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='默认昵称库';
  
-- 动态信息表
CREATE TABLE `tongxue_moment` (
  `ID` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `CONTENT` varchar(2000) DEFAULT NULL COMMENT '动态内容',
  `TOPIC_ID` bigint DEFAULT NULL COMMENT '话题ID',
  `AUTHOR` char(100) DEFAULT NULL COMMENT '作者（人/号）',
  `RELATED_USER` char(100) DEFAULT NULL COMMENT '绑定用户',
  `STATUS` char(50) NOT NULL COMMENT '状态',
  `CONTAIN_AT` tinyint(1) DEFAULT '0' COMMENT '是否包含@',
  `CONTAIN_IMAGE` tinyint(1) DEFAULT '0' COMMENT '是否包含图片',
  `CONTAIN_VIDEO` tinyint(1) DEFAULT '0' COMMENT '是否包含视频',
  `CONTAIN_LINK` tinyint(1) DEFAULT '0' COMMENT '是否包含链接',
  `IS_TOP` tinyint(1) DEFAULT '0' COMMENT '是否置顶',
  `IS_REPORT` tinyint(1) DEFAULT '0' COMMENT '是否被成功举报',
  `IS_SINK` tinyint(1) DEFAULT '0' COMMENT '是否沉底',
  `IS_MARK` tinyint(1) DEFAULT '0' COMMENT '是否标记',
  `IS_ESSENCE` tinyint(1) DEFAULT '0' COMMENT '是否推荐精华',
  `IS_SPECIAL` tinyint(1) DEFAULT '0' COMMENT '是否特殊动态，非用户帐号',
  `PUB_DATE` datetime DEFAULT NULL COMMENT '发布时间',
  `CREATE_BY` char(100) DEFAULT NULL COMMENT '创建人',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UPDATE_BY` char(100) DEFAULT NULL COMMENT '更新人',
  `UPDATE_DATE` datetime DEFAULT NULL COMMENT '更新时间',
  `VERSION` int DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`ID`),
  KEY `INDEX_MOMENT_AUTHOR` (`AUTHOR`),
  KEY `INDEX_MOMENT_STATUS` (`STATUS`),
  KEY `INDEX_MOMENT_PUB_DATE` (`PUB_DATE`),
  KEY `INDEX_MOMENT_TOPIC_ID` (`TOPIC_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='动态主体内容表'
 
 
-- 动态资源表
CREATE TABLE tongxue.`tongxue_moment_resource` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `MOMENT_ID` bigint NOT NULL COMMENT '动态业务ID',
  `NAME` varchar(500) COMMENT '资源名称',
  `TYPE` char(20) DEFAULT NULL COMMENT '资源类型',
    `FORMAT` char(20) DEFAULT NULL COMMENT '格式',
    `URL` varchar(200) DEFAULT NULL COMMENT 'URL',
    `SIZE` bigint DEFAULT NULL COMMENT '资源大小',
    `SORT` int(11) NOT NULL DEFAULT 1 COMMENT '排序位置',
    `STATUS` char(50) NOT NULL COMMENT '状态',
    `EXTRA_INFO` text DEFAULT NULL COMMENT '扩展字段',
    `CREATE_BY` char(100) DEFAULT NULL COMMENT '创建人',
    `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `UPDATE_BY` char(100) DEFAULT NULL COMMENT '更新人',
    `UPDATE_DATE` datetime DEFAULT NULL COMMENT '更新时间',
    `VERSION` int DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`ID`),
  KEY `RESOURCE_MOMENT_ID` (`MOMENT_ID`),
  KEY `INDEX_RESOURCE_STATUS` (`STATUS`),
  KEY `INDEX_RESOURCE_SORT` (`SORT`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='动态资源表';
 
 
-- 动态插入外链卡片信息表
CREATE TABLE tongxue.`tongxue_moment_link` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `MOMENT_ID` bigint NOT NULL COMMENT '动态业务ID',
  `TITLE` varchar(100) DEFAULT NULL COMMENT '网页标题',
  `ICON` varchar(1000) DEFAULT NULL COMMENT 'ICON图标',
    `IMAGE` varchar(1000) DEFAULT NULL COMMENT '首图',
    `SUMMARY` varchar(200) DEFAULT NULL COMMENT '首图',
    `LINK` varchar(500) DEFAULT NULL COMMENT '原链接',
    `STATUS` char(50) NOT NULL COMMENT '状态',
    `CREATE_BY` char(100) DEFAULT NULL COMMENT '创建人',
    `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `UPDATE_BY` char(100) DEFAULT NULL COMMENT '更新人',
  `UPDATE_DATE` datetime DEFAULT NULL  COMMENT '更新时间',
  `VERSION` int DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`ID`),
  KEY `LINK_MOMENT_ID` (`MOMENT_ID`),
  KEY `LINK_RESOURCE_STATUS` (`STATUS`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='动态插入外链卡片信息表';
 
CREATE TABLE tongxue.`tongxue_moment_hot_value` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `MOMENT_ID` bigint NOT NULL COMMENT '动态ID',
  `HOT_VALUE` decimal(10,2) DEFAULT NULL COMMENT '热度值',
  `HOT_DATE` datetime DEFAULT NULL COMMENT '热度计算时间',
  `CREATE_DATE` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UPDATE_DATE` datetime  DEFAULT NULL  COMMENT '更新时间',
  `VERSION` int DEFAULT '0' COMMENT '记录版本',
  PRIMARY KEY (`ID`) USING BTREE,
  KEY `idx_moment_id` (`MOMENT_ID`) USING BTREE,
  KEY `idx_hot_date` (`HOT_DATE`) USING BTREE,
  KEY `idx_hot_value` (`HOT_VALUE`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='动态热度表';
-- 推荐历史
CREATE TABLE tongxue.`tongxue_moment_feed_history` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `MOMENT_ID` bigint DEFAULT NULL COMMENT '动态索引',
  `USER_NAME` char(100) DEFAULT NULL COMMENT '作者（人/号）',
    `RELATED_USER` char(100) DEFAULT NULL COMMENT '关联账号',
    `STATUS` char(50) NOT NULL COMMENT '状态',
  `FEED_DATE` datetime DEFAULT NULL COMMENT '推荐时间',
  `VERSION` int DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`ID`),
  KEY `INDEX_USER_NAME` (`USER_NAME`),
  KEY `INDEX_STATUS` (`STATUS`),
  KEY `INDEX_FEED_DATE` (`FEED_DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='推荐历史';
 
-- 关注动态时间线
CREATE TABLE tongxue.`tongxue_moment_focus_time_line` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `MOMENT_INDEX` bigint(20) COMMENT '动态索引',
  `USER_NAME` char(100) DEFAULT NULL COMMENT '作者（人/号）',
    `SOURCE` char(100) NOT NULL COMMENT '关注了什么，使动态加入了时间线',
    `SOURCE_INDEX` char(100) NOT NULL COMMENT 'SOURCE的索引：人、话题……',
  `STATUS` tinyint(1) default '0' COMMENT '状态：可见/不可见',
    `TIME_LINE` datetime DEFAULT NULL COMMENT '动态发布的时间',
  `VERSION` int DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`ID`),
  KEY `INDEX_USER_NAME` (`USER_NAME`),
    KEY `INDEX_MOMENT_INDEX` (`MOMENT_INDEX`),
  KEY `INDEX_SOURCE_INDEX` (`SOURCE`, `SOURCE_INDEX`),
  KEY `INDEX_STATUS` (`STATUS`),
  KEY `INDEX_TIME_LINE` (`TIME_LINE`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='关注动态时间线';
 
 
-- 动态点赞记录表
CREATE TABLE tongxue.`tongxue_moment_support` (
`ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
`MOMENT_ID` bigint NOT NULL COMMENT '动态业务ID',
`USER_NAME` char(100) NOT NULL COMMENT '操作人',
`RELATED_USER` char(100) DEFAULT NULL COMMENT '关联用户帐号',
`STATUS` char(50) NOT NULL COMMENT '状态',
`SUPPORT_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '点赞时间',
`VERSION` int DEFAULT '0' COMMENT '版本',
PRIMARY KEY (`ID`),
KEY `SUPPORT_MOMENT_ID` (`MOMENT_ID`),
KEY `SUPPORT_MOMENT_USER` (`USER_NAME`),
KEY `SUPPORT_MOMENT_STATUS` (`STATUS`),
KEY `SUPPORT_MOMENT_SUPPORT_DATE` (`SUPPORT_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='动态点赞记录表';
 
 
 
 
-- 不喜欢动态记录表
CREATE TABLE tongxue.`tongxue_moment_dis_like` (
`ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
`MOMENT_ID` bigint NOT NULL COMMENT '动态业务ID',
`USER_NAME` char(100) NOT NULL COMMENT '操作人',
`RELATED_USER` char(100) DEFAULT NULL COMMENT '关联用户帐号',
`DIS_LIKE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '不喜欢时间',
`VERSION` int DEFAULT '0' COMMENT '版本',
PRIMARY KEY (`ID`),
KEY `SUPPORT_MOMENT_ID` (`MOMENT_ID`),
KEY `SUPPORT_MOMENT_USER` (`USER_NAME`),
KEY `DIS_LIKE_DATE` (`DIS_LIKE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='不喜欢动态记录表';
 
 
-- 动态收藏记录表
CREATE TABLE tongxue.`tongxue_moment_collect` (
`ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
`MOMENT_ID` bigint NOT NULL COMMENT '动态业务ID',
`USER_NAME` char(100) NOT NULL COMMENT '操作人',
`RELATED_USER` char(100) DEFAULT NULL COMMENT '关联用户帐号',
`STATUS` char(50) NOT NULL COMMENT '状态',
`COLLECT_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '收藏时间',
`VERSION` int DEFAULT '0' COMMENT '版本',
PRIMARY KEY (`ID`),
KEY `SUPPORT_MOMENT_ID` (`MOMENT_ID`),
KEY `SUPPORT_MOMENT_USER` (`USER_NAME`),
KEY `SUPPORT_MOMENT_STATUS` (`STATUS`),
KEY `SUPPORT_MOMENT_COLLECT_DATE` (`COLLECT_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='动态收藏记录表';
 
 
-- 动态分享记录表
CREATE TABLE tongxue.`tongxue_moment_share` (
`ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
`MOMENT_ID` bigint NOT NULL COMMENT '动态业务ID',
`USER_NAME` char(100) NOT NULL COMMENT '操作人',
`RELATED_USER` char(100) DEFAULT NULL COMMENT '关联用户帐号',
`SHARE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '分享时间',
`VERSION` int DEFAULT '0' COMMENT '版本',
PRIMARY KEY (`ID`),
KEY `SUPPORT_MOMENT_ID` (`MOMENT_ID`),
KEY `SUPPORT_MOMENT_USER` (`USER_NAME`),
KEY `SUPPORT_MOMENT_SHARE_DATE` (`SHARE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='动态分享记录表';
 
-- 动态访问记录表
CREATE TABLE tongxue.`tongxue_moment_visit` (
`ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
`MOMENT_ID` bigint NOT NULL COMMENT '动态业务ID',
`USER_NAME` char(100) NOT NULL COMMENT '操作人',
`RELATED_USER` char(100) DEFAULT NULL COMMENT '关联用户帐号',
`VISIT_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '访问时间',
`VERSION` int DEFAULT '0' COMMENT '版本',
PRIMARY KEY (`ID`),
KEY `SUPPORT_MOMENT_ID` (`MOMENT_ID`),
KEY `SUPPORT_MOMENT_USER` (`USER_NAME`),
KEY `SUPPORT_MOMENT_VISIT_DATE` (`VISIT_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='动态访问记录表';
 
-- 蹲动态记录表
CREATE TABLE tongxue.`tongxue_moment_crouch` (
`ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
`MOMENT_ID` bigint NOT NULL COMMENT '动态业务ID',
`USER_NAME` varchar(100) NOT NULL COMMENT '操作人',
`RELATED_USER` varchar(100) DEFAULT NULL COMMENT '关联用户帐号',
`STATUS` char(50) NOT NULL COMMENT '状态',
`CROUCH_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '蹲时间',
`TIME_LINE` bigint(20) DEFAULT NULL COMMENT '时间线',
`VERSION` int DEFAULT '0' COMMENT '版本',
PRIMARY KEY (`ID`),
KEY `INDEX_MOMENT_ID` (`MOMENT_ID`),
KEY `INDEX_USER_NAME` (`USER_NAME`),
KEY `INDEX_STATUS` (`STATUS`),
KEY `INDEX_CROUCH_DATE` (`CROUCH_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='蹲动态记录表';
 
 
 
 
 
 
-- 同学圈动态干涉表(置顶、中插、沉底)
CREATE TABLE tongxue.`tongxue_moment_interference` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
   `moment_id` bigint(20) NOT NULL COMMENT '动态Id',
  `is_valid` tinyInt(1)  DEFAULT 0 COMMENT '是否有效',
   `action_type` varchar(50)  NOT NULL COMMENT '事件类型',
   `type_code` varchar(50)  NOT NULL COMMENT '类型Code',
   `reason` varchar(100) DEFAULT NULL COMMENT '操作事件原因',
  `create_by` varchar(100) DEFAULT NULL COMMENT '创建人',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(100) DEFAULT NULL COMMENT '更新人',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `version` int(11) DEFAULT '0' COMMENT '记录版本',
  PRIMARY KEY (`ID`) USING BTREE,
     KEY `INDEX_MOMENT_ID` (`moment_id`) USING BTREE,
      KEY `INDEX_ACTION_TYPE` (`action_type`) USING BTREE,
      KEY `INDEX_TYPE_CODE` (`type_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='同学圈动态干涉表';
 
 
-- 同学圈推荐精华表
CREATE TABLE tongxue.`tongxue_moment_essence` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
   `moment_id` bigint(20) NOT NULL COMMENT '动态Id',
  `is_Essence` tinyInt(1)  DEFAULT 0 COMMENT '是否推荐精华',
  `create_by` varchar(100) DEFAULT NULL COMMENT '创建人',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(100) DEFAULT NULL COMMENT '更新人',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `version` int(11) DEFAULT '0' COMMENT '记录版本',
  PRIMARY KEY (`ID`) USING BTREE,
     KEY `INDEX_MOMENT_ID` (`moment_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='同学圈推荐精华表';
 
 
 
 
-- 同学圈删除表
CREATE TABLE tongxue.`tongxue_moment_delete` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
   `moment_id` bigint(20) NOT NULL COMMENT '动态Id',
   `type_code` varchar(50)  NOT NULL COMMENT '删除类型类型Code',
   `reason` varchar(100) DEFAULT NULL COMMENT '删除原因',
  `create_by` varchar(100) DEFAULT NULL COMMENT '创建人',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(100) DEFAULT NULL COMMENT '更新人',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `version` int(11) DEFAULT '0' COMMENT '记录版本',
  PRIMARY KEY (`ID`) USING BTREE,
     KEY `INDEX_MOMENT_ID` (`moment_id`) USING BTREE,
      KEY `INDEX_TYPE_CODE` (`type_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='同学圈删除表';
 
 
 
 
-- 同学圈动态标记表
CREATE TABLE tongxue.`tongxue_moment_mark` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
   `moment_id` bigint(20) NOT NULL COMMENT '动态Id',
   `is_mark` tinyInt(1)  DEFAULT 0 COMMENT '是否有效',
  `create_by` varchar(100) DEFAULT NULL COMMENT '创建人',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(100) DEFAULT NULL COMMENT '更新人',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `version` int(11) DEFAULT '0' COMMENT '记录版本',
  PRIMARY KEY (`ID`) USING BTREE,
     KEY `INDEX_MOMENT_ID` (`moment_id`) USING BTREE,
      KEY `INDEX_IS_MARK` (`is_mark`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='同学圈动态标记表';
 
 
-- 同学圈动态举报表
CREATE TABLE tongxue.`tongxue_moment_report` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
   `moment_id` bigint(20) NOT NULL COMMENT '动态Id',
   `status` varchar(50)  NOT NULL COMMENT '举报信息状态',
   `informer` varchar(100)  DEFAULT NULL COMMENT '举报者',
   `report_date` datetime DEFAULT NULL COMMENT '举报时间',
   `type` varchar(50)  NOT NULL COMMENT '举报类型',
   `reason` varchar(100) DEFAULT NULL COMMENT '举报原因',
   `is_main` tinyInt(1)  DEFAULT 0 COMMENT '是否为主要举报记录',
   `handler` varchar(100)  DEFAULT NULL COMMENT '处理者',
   `handle_date` datetime DEFAULT NULL COMMENT '处理时间',
  `create_by` varchar(100) DEFAULT NULL COMMENT '创建人',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(100) DEFAULT NULL COMMENT '更新人',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `version` int(11) DEFAULT '0' COMMENT '记录版本',
  PRIMARY KEY (`ID`) USING BTREE,
     KEY `INDEX_MOMENT_ID` (`moment_id`) USING BTREE,
      KEY `INDEX_TYPE` (`type`) USING BTREE,
      KEY `INDEX_INFORMER` (`informer`) USING BTREE,
      KEY `INDEX_HANDLER` (`handler`) USING BTREE,
      KEY `INDEX_IS_MAIN` (`is_main`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='同学圈动态举报表';
-- 好友关系表
CREATE TABLE tongxue.`tongxue_user_friend_relation` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `USER_NAME` char(50) NOT NULL COMMENT '用户',
  `FRIEND_NAME` char(50) NOT NULL COMMENT '朋友',
  `IS_FOCUS` tinyInt(1) DEFAULT NULL COMMENT '关注状态，TRUE关注，FALSE取关',
  `FOCUS_DATE` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UPDATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `VERSION` int DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`ID`),
  KEY `FRIEND_RELATION_USER_NAME` (`USER_NAME`),
  KEY `FRIEND_RELATION_FRIEND_NAME` (`FRIEND_NAME`),
    KEY `FRIEND_RELATION_IS_FOCUS` (`IS_FOCUS`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='好友关系表';
 
 
-- 同学圏(用户)账号表
CREATE TABLE tongxue.`tongxue_user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `user_name` varchar(100)  DEFAULT NULL COMMENT '用户名:二次入职，不唯一',
  `nick_name` varchar(100)  DEFAULT NULL COMMENT '昵称',
  `business_name` varchar(100)  DEFAULT NULL COMMENT '业务方名称',
  `account_type` varchar(50)  DEFAULT NULL COMMENT '账号类型',
  `sex` varchar(50) DEFAULT NULL COMMENT '性别 MALE：男，FEMALE：女',
  `show_sex` tinyint(1) DEFAULT '0' COMMENT '是否显示性别 0：不显示，1：显示',
  `photo` varchar(200)  DEFAULT NULL COMMENT '头像',
  `signature` varchar(200) DEFAULT NULL COMMENT '个性签名',
  `create_by` varchar(100) DEFAULT NULL COMMENT '创建人',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(100) DEFAULT NULL COMMENT '更新人',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `version` int(11) DEFAULT '0' COMMENT '记录版本',
  PRIMARY KEY (`ID`) USING BTREE,
    KEY `INDEX_USER_NAME` (`user_name`) USING BTREE,
    KEY `INDEX_ACCOUNT_TYPE` (`account_type`) USING BTREE,
    KEY `INDEX_NICK_NAME` (`nick_name`) USING BTREE,
    KEY `INDEX_BUSINESS_NAME` (`business_name`) USING BTREE,
    KEY `INDEX_CREATE_DATE` (`create_date`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='同学圈(用户)账号表';
 
 
-- 同学圈官方关联个人用户表
CREATE TABLE tongxue.`tongxue_official_user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `official_id` bigint(20)  NOT NULL COMMENT '官方账号Id',
  `user_name` varchar(100)  DEFAULT NULL COMMENT '用户名',
    `create_by` varchar(100) DEFAULT NULL COMMENT '创建人',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(100) DEFAULT NULL COMMENT '更新人',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `version` int(11) DEFAULT '0' COMMENT '记录版本',
  PRIMARY KEY (`ID`) USING BTREE,
    KEY `INDEX_USER_NAME` (`user_name`) USING BTREE,
    KEY `INDEX_OFFICIAL_ID` (`official_Id`) USING BTREEKEY `INDEX_BUSINESS_NAME` (`business_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='官方个人账号关联表';
 
 
-- 同学圈管控表(目前只有黑名单)
CREATE TABLE tongxue.`tongxue_user_control` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `user_name` varchar(100)  DEFAULT NULL COMMENT '用户名, uuap',
  `action` varchar(50)  DEFAULT NULL COMMENT '事件类型',
  `status` varchar(50)  DEFAULT NULL COMMENT '状态',
  `reason` varchar(200) DEFAULT NULL COMMENT '理由',
  `create_by` varchar(100) DEFAULT NULL COMMENT '创建人',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(100) DEFAULT NULL COMMENT '更新人',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `version` int(11) DEFAULT '0' COMMENT '记录版本',
  PRIMARY KEY (`ID`) USING BTREE,
      KEY `INDEX_USER_NAME` (`user_name`) USING BTREE,
        KEY `INDEX_ACTION` (`action`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='同学圈管控表';
 
 
-- 同学圏角色表
CREATE TABLE tongxue.`tongxue_role` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `name` varchar(100)  DEFAULT NULL COMMENT '角色名称',
  `code` varchar(50)  DEFAULT NULL COMMENT '角色code',
  `sort` int(11) DEFAULT '0' COMMENT '排序',
  `create_by` varchar(100) DEFAULT NULL COMMENT '创建人',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(100) DEFAULT NULL COMMENT '更新人',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `version` int(11) DEFAULT '0' COMMENT '记录版本',
  PRIMARY KEY (`ID`) USING BTREE,
      KEY `INDEX_NAME` (`name`) USING BTREE,
        KEY `INDEX_CODE` (`code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='同学圏角色表';
 
 
-- 同学圏用户角色关联表
CREATE TABLE tongxue.`tongxue_role_user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `user_name` varchar(100)  NOT NULL COMMENT '用户名称',
    `role_id` bigint(20) NOT NULL COMMENT '角色id',
  `create_by` varchar(100) DEFAULT NULL COMMENT '创建人',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(100) DEFAULT NULL COMMENT '更新人',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `version` int(11) DEFAULT '0' COMMENT '记录版本',
  PRIMARY KEY (`ID`) USING BTREE,
      KEY `INDEX_USER_NAME` (`user_name`) USING BTREE,
        KEY `INDEX_ROLE_ID` (`role_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='同学圏用户角色关联表';
 
 
-- 同学圏昵称禁选表
CREATE TABLE tongxue.`tongxue_forbid_nick_name` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `nick_name` varchar(100)  NOT NULL COMMENT '禁选昵称',
  `create_by` varchar(100) DEFAULT NULL COMMENT '创建人',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(100) DEFAULT NULL COMMENT '更新人',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `version` int(11) DEFAULT '0' COMMENT '记录版本',
  PRIMARY KEY (`ID`) USING BTREE,
      KEY `INDEX_USER_NAME` (`nick_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='同学圏昵称禁选表';
 
-- 蹲动态记录表
CREATE TABLE tongxue.`tongxue_moment_crouch` (
`ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
`MOMENT_ID` bigint NOT NULL COMMENT '动态业务ID',
`USER_NAME` varchar(100) NOT NULL COMMENT '操作人',
`RELATED_USER` varchar(100) DEFAULT NULL COMMENT '关联用户帐号',
`STATUS` char(50) NOT NULL COMMENT '状态',
`CROUCH_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '蹲时间',
`TIME_LINE` bigint(20) DEFAULT NULL COMMENT '时间线',
`VERSION` int DEFAULT '0' COMMENT '版本',
PRIMARY KEY (`ID`),
KEY `INDEX_MOMENT_ID` (`MOMENT_ID`),
KEY `INDEX_USER_NAME` (`USER_NAME`),
KEY `INDEX_STATUS` (`STATUS`),
KEY `INDEX_CROUCH_DATE` (`CROUCH_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='蹲动态记录表';
 
 
-- 评论删除表
CREATE TABLE tongxue.`tongxue_comment_deleted` (
`ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
`COMMENT_ID` bigint NOT NULL COMMENT '评论ID',
`TYPE_CODE` varchar(50)  NOT NULL COMMENT '删除类型类型Code',
`CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`VERSION` int DEFAULT '0' COMMENT '版本',
PRIMARY KEY (`ID`),
KEY `INDEX_COMMENT_ID` (`COMMENT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='评论删除表';
 
 
-- 消息推送配置
CREATE TABLE tongxue.`tongxue_hi_push_config` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `MESSAGE_TYPE` int(4) NOT NULL COMMENT '消息类型',
  `GROUP_ID` bigint NOT NULL COMMENT '分组ID，默认分组0',
  `HI_NO` varchar(32) NOT NULL COMMENT '如流号',
  `CREATE_BY` varchar(100) DEFAULT NULL COMMENT '创建人',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UPDATE_BY` varchar(100) DEFAULT NULL COMMENT '更新人',
  `UPDATE_DATE` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `DELETED` tinyint(1) DEFAULT '0' COMMENT '0 未删除 1 已删除',
  `VERSION` int(11) DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`ID`) USING BTREE,
  KEY `INDEX_MESSAGE_TYPE` (`MESSAGE_TYPE`),
  KEY `INDEX_GROUP_ID` (`GROUP_ID`),
  KEY `INDEX_HI_NO` (`HI_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='消息推送配置表';
 
-- 系统消息表
CREATE TABLE tongxue.`tongxue_system_message` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `RECEIVER` varchar(100) DEFAULT NULL COMMENT '接收用户',
   `RELATED_USER` varchar(100) DEFAULT NULL COMMENT '关联用户帐号',
  `CONTENT` varchar(2000) COMMENT '消息内容',
  `STATUS` tinyint(1) DEFAULT '0'  COMMENT '0 未读 1 已读',
  `READ_DATE` datetime DEFAULT NULL COMMENT '记取时间',   
  `CREATE_DATE` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
  `UPDATE_DATE` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `VERSION` int DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`ID`),
  KEY `INDEX_RECEIVER_USER` (`RECEIVER`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COMMENT='系统消息';
 
 
-- 用户消息
CREATE TABLE tongxue.`tongxue_user_message` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `SENDER` varchar(100) DEFAULT NULL COMMENT '发送用户',
  `RECEIVER` varchar(100) DEFAULT NULL COMMENT '接收用户',
  `RELATED_USER` varchar(100) DEFAULT NULL COMMENT '关联用户帐号',
  `CONTENT` varchar(128) DEFAULT NULL COMMENT '消息内容(非拼接消息)',
  `EXT1` varchar(128) DEFAULT NULL COMMENT '扩展字段1',
  `RESOURCE_ID` bigint(20) DEFAULT NULL COMMENT '资源ID',
  `OBJECT_ID` bigint(20) DEFAULT NULL COMMENT '对象ID',
  `MESSAGE_TYPE` int(4) DEFAULT '0' COMMENT '消息类型',
  `STATUS` tinyint(1) DEFAULT '0' COMMENT '0 未读 1 已读',
  `READ_DATE` datetime DEFAULT NULL COMMENT '记取时间',
  `CREATE_DATE` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
  `UPDATE_DATE` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `VERSION` int(11) DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`ID`),
  KEY `INDEX_RECEIVER_USER` (`RECEIVER`),
  KEY `INDEX_TYPE` (`MESSAGE_TYPE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COMMENT='用户消息';
 
-- 蹲消息
CREATE TABLE tongxue.`tongxue_crouch_message` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `SENDER` varchar(100) DEFAULT NULL COMMENT '发送用户',
  `CONTENT` varchar(128) DEFAULT NULL COMMENT '消息内容',
  `RESOURCE_ID` bigint(20) DEFAULT NULL COMMENT '资源ID',
  `OBJECT_ID` bigint(20) DEFAULT NULL COMMENT '对象ID',
  `CREATE_DATE` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
  `UPDATE_DATE` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `VERSION` int(11) DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`ID`),
  KEY `INDEX_SENDER_USER` (`SENDER`),
  KEY `INDEX_RESOURCE_ID` (`RESOURCE_ID`),
    KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COMMENT='蹲消息';
 
-- 关键词监控配置
CREATE TABLE tongxue.`tongxue_keyword_monitor_config` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `GROUP_ID` bigint NOT NULL COMMENT '分组ID，默认分组0',
    `KEYWORD` varchar(32) NOT NULL COMMENT '关键词',
  `CREATE_BY` varchar(100) DEFAULT NULL COMMENT '创建人',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UPDATE_BY` varchar(100) DEFAULT NULL COMMENT '更新人',
  `UPDATE_DATE` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `DELETED` tinyint(1) DEFAULT '0' COMMENT '0 未删除 1 已删除',
  `VERSION` int(11) DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`ID`) USING BTREE,
    KEY `INDEX_GROUP_ID` (`GROUP_ID`),
    KEY `INDEX_KEYWORD` (`KEYWORD`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='关键词监控配置表';
 
-- 链接监控配置
CREATE TABLE tongxue.`tongxue_link_monitor_config` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `GROUP_ID` bigint NOT NULL COMMENT '分组ID，默认分组0',
    `LINK_NAME` varchar(32) NOT NULL COMMENT '链接名称',
    `LINK_URL` varchar(128) NOT NULL COMMENT '链接地址',
  `CREATE_BY` varchar(100) DEFAULT NULL COMMENT '创建人',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UPDATE_BY` varchar(100) DEFAULT NULL COMMENT '更新人',
  `UPDATE_DATE` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `DELETED` tinyint(1) DEFAULT '0' COMMENT '0 未删除 1 已删除',
  `VERSION` int(11) DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`ID`) USING BTREE,
    KEY `INDEX_GROUP_ID` (`GROUP_ID`),
    KEY `INDEX_LINK_NAME` (`LINK_NAME`),
    KEY `INDEX_LINK_URL` (`LINK_URL`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='链接监控配置表';
 
 
 
-- 文案内容配置信息
CREATE TABLE tongxue.`tongxue_content_template_config` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `CODE` varchar(64) NOT NULL COMMENT '编号',
  `CONTENT` varchar(512) NOT NULL COMMENT '内容',
  `REMARK` varchar(64) DEFAULT NULL COMMENT '备注',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UPDATE_DATE` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `DELETED` tinyint(1) DEFAULT '0' COMMENT '0 未删除 1 已删除',
  `VERSION` int(11) DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`ID`) USING BTREE,
  UNIQUE KEY `INDEX_CODE` (`CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='文案内容配置信息';
 
-- 文案内容（消息通知）
insert into tongxue.`tongxue_content_template_config` (`code`,`content`,`remark`) values
('MESSAGE_REPORT_SHIELD_TO_REPORTED_MAN', '同学，你好。你发布的动态（${momentContent}）被多位同学举报，系统已对该动态做暂时屏蔽处理，请耐心等待管理员审核处理。', '被多人举报通知_消息通知'),
('MESSAGE_REPORT_SUCCESS_TO_REPORTED_MAN','同学，你好。你发布的动态（${momentContent}）遭到举报（举报理由：${reason}），经管理员审核举报信息属实，并对该动态做删除处理。创造和谐社区环境，人人有责！','被成功举报通知被举报人_消息通知'),
('MESSAGE_REPORT_SUCCESS_TO_REPORT_MAN','同学，你好。你举报的动态（${momentContent}）已完成审核，举报信息属实，管理员已对该信息做删除处理。感谢您对净化平台环境做出的支持！','举报成功结果通知举报人_消息通知'),
('MESSAGE_REPORT_FAIL_TO_REPORT_MAN','同学，你好。你举报的动态（${momentContent}）已完成审核，举报信息无效。感谢您对净化平台环境做出的支持','举报失败结果通知举报人_消息通知'),
('MESSAGE_REPORT_FAIL_TO_REPORTED_MAN','同学，你好。你发布的动态（${momentContent}）遭到举报（举报理由：${reason}），经管理员审核举报信息无效，您的动态已恢复正常展示。感谢您对平台的理解和支持！','举报失败结果通知被举报人_消息通知'),
('MESSAGE_AWARD_TOPIC_WON','同学，你好。你参与发布有奖话题动态活动（${topic}），很幸运抽到${count}个简单币，已打入您的简单币账户，请再接再厉哟~','有奖话题发动态投奖结果通知_消息通知'),
('MESSAGE_AWARD_TOPIC_WON_CANCEL','同学，你好。因${reason}原因，你参与有奖话题（${topic}）抽到的${count}个简单币已经被管理员收回。遵守社区规范，人人有责！','有奖话题中奖撤回通知_消息通知'),
('MESSAGE_BANNED','由于${reason}原因，你已被管理员实施不定期禁言！','被禁言通知_消息通知'),
('MESSAGE_BANNED_CANCEL','管理员已取消你的禁言处理。创造和谐社区环境，人人有责','被取消禁言通知_消息通知'),
('MESSAGE_MOMENT_ADD_ESSENCE','同学，你好。你发布的动态（${momentContent}）已被管理员推荐为精华动态，将会得到更多的曝光机会，请再接再厉哟~','动态被推荐精华通知_消息通知'),
('MESSAGE_MOMENT_CANCEL_ESSENCE','同学，你好。你发布的动态（${momentContent}）已被管理员取消推荐精华动态，感谢您的理解。','动态被取消精华通知_消息通知'),
('MESSAGE_MOMENT_DELETED','同学，你好。你发布的动态（${momentContent}）因${reason}理由，已被管理员删除。创建和谐社区环境，人人有责！','动态被删除通知_消息通知');
 
-- 文案内容（操作日志）
insert into tongxue.`tongxue_content_template_config` (`code`,`content`,`remark`) values
('LOG_BANNED', '禁言了${userName}，禁言理由：${reason}', '禁言_操作日志'),
('LOG_BANNED_CANCEL', '取消禁言${userName}', '取消禁言_操作日志'),
('LOG_CREATE_OFFICIAL_USER', '创建了官方账户${userName}', '创建官方账号_操作日志'),
('LOG_UPDATE_OFFICIAL_USER', '编辑了官方账户${userName}(${nickName})', '编辑官方账户_操作日志'),
('LOG_ADD_ADMINISTRATOR', '授予${userName}管理员角色', '授予管理员角色_操作日志'),
('LOG_ADD_ADMINISTRATOR_CANCEL', '撤销${userName}管理员角色', '撤销管理员角色_操作日志'),
('LOG_RECOMMEND', '推荐了精华动态：${userName}的动态（ID:${momentId}；正文：${momentContent}）', '推荐精华动态_操作日志'),
('LOG_RECOMMEND_CANCEL', '取消推荐精华动态：${userName}的动态（ID:${momentId}；正文：${momentContent}）', '取消推荐精华动态_操作日志'),
('LOG_MARK_MOMENT', '标记了动态（ID:${momentId}；正文：${momentContent}）', '标记动态_操作日志'),
('LOG_MARK_MOMENT_CANCEL', '取消标记动态（ID:${momentId}；正文：${momentContent}）', '取消标记动态_操作日志'),
('LOG_SINK_MOMENT', '沉底了动态（ID:${momentId}；正文：${momentContent}）', '沉底动态_操作日志'),
('LOG_SINK_MOMENT_CANCEL', '取消沉底动态（ID:${momentId}；正文：${momentContent}）', '取消沉底动态_操作日志'),
('LOG_DELETED_MOMENT', '删除了动态（${momentContent}）', '删除动态_操作日志'),
('LOG_DELETED_COMMENT', '删除了动态（${momentContent}）的评论（${commentContent}）', '删除评论_操作日志'),
('LOG_TOP_COMMENT', '置顶了动态（${momentContent}）的评论（${commentContent}）', '置顶评论_操作日志'),
('LOG_TOP_COMMENT_CANCEL', '取消置顶动态（${momentContent}）的评论（${commentContent}）', '取消置顶评论_操作日志'),
('LOG_CREATE_TOPIC_CATEGORY', '创建了话题类目（${category}）', '创建类目_操作日志'),
('LOG_UPDATE_TOPIC_CATEGORY', '更新类目（${oldCategory}）为类目（${newCategory}）', '更新类目_操作日志'),
('LOG_DELETED_TOPIC_CATEGORY', '删除了话题类目（${category}）', '删除类目_操作日志'),
('LOG_CREATE_TOPIC', '创建了话题${topic}（${category}）', '创建话题_操作日志'),
('LOG_UPDATE_TOPIC', '更新话题${oldTopic}（${oldCategory}）为话题${newTopic}（${newCategory}）', '更新话题_操作日志'),
('LOG_DELETED_TOPIC', '删除了话题${topic}（${category}）', '删除话题_操作日志'),
('LOG_SHIELD_TOPIC', '屏蔽了话题${topic}（${category}）', '屏蔽话题_操作日志'),
('LOG_SHIELD_TOPIC_CANCEL', '取消屏蔽话题${topic}（${category}）', '取消屏蔽话题_操作日志'),
('LOG_RECOMMEND_TOPIC', '推荐了话题${topic}（${category}）', '话题推荐_操作日志'),
('LOG_RECOMMEND_TOPIC_CANCEL', '取消推荐话题${topic}（${category}）', '取消话题推荐_操作日志'),
('LOG_REPORT_INFO_CONFIRM', '处理了${userName}的举报信息（ID:${momentId}；正文：${momentContent}；举报理由：${reason}），认定举报有效（已删除该动态）', '认定举报有效_操作日志'),
('LOG_REPORT_INFO_CANCEL', '处理了${userName}的举报信息（ID:${momentId}；正文：${momentContent}；举报理由：${reason}），认定举报无效', '认定举报无效_操作日志');
   
-- 文案内容（HI消息）
insert into tongxue.`tongxue_content_template_config` (`code`,`content`,`remark`) values
('HI_MESSAGE_MARK_MOMENT','【${title}】\n动态内容：${momentContent}\n动态链接：${detailUrl}\n评论内容：${commentContent}','标记动态评论通知'),
('HI_MESSAGE_MARK_MOMENT_REPLY','【${title}】\n动态内容：${momentContent}\n动态链接：${detailUrl}\n回复内容：${replyContent}\n父评论内容：${commentContent}','标记动态回复通知'),
('HI_MESSAGE_KEYWORD','【${title}】\n命中关键词：${keywords}\n动态内容：${momentContent}\n动态链接：${detailUrl}','命中关键词通知'),
('HI_MESSAGE_ILLEGAL_LINK','【${title}】\n插入链接名称：${linkName}\n插入链接：${link}\n动态内容：${momentContent}\n动态链接：${detailUrl}','动态插入违规链接通知'),
('HI_MESSAGE_REPORT_MOMENT','【${title}】\n动态内容：${momentContent}\n动态链接：${detailUrl}\n举报理由：${reason}','举报信息通知'),
('HI_MESSAGE_CUSTOM_TOPIC','【${title}】\n动态内容：${momentContent}\n动态链接：${detailUrl}\n自定义话题：${topic}','用户自定义话题通知'),
('HI_MESSAGE_SENSITIVE_MOMENT','【${title}】\n动态内容：${momentContent}\n动态链接：${detailUrl}\n涉敏原因：${reason}','涉敏动态通知'),
('HI_MESSAGE_NEW_MOMENT','【${title}】\n动态内容：${momentContent}\n动态链接：${detailUrl}','实时动态推送');
 
-- 操作日志表
CREATE TABLE tongxue.`tongxue_operation_log` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `OPERATOR` varchar(100) NOT NULL COMMENT '操作人',
  `OPERATOR_NAME` varchar(100) DEFAULT NULL COMMENT '操作人姓名',
  `TYPE` varchar(64) NOT NULL COMMENT '操作类型',
  `DETAIL_TYPE` varchar(64) NOT NULL COMMENT '详细操作类型',
  `OBJECT_ID` bigint(20) DEFAULT NULL COMMENT '对象ID',
  `CONTENT` varchar(256) DEFAULT NULL COMMENT '日志内容',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `VERSION` int(11) DEFAULT '0' COMMENT '版本',
  PRIMARY KEY (`ID`),
  KEY `INDEX_TYPE` (`TYPE`),
  KEY `INDEX_OPERATOR` (`OPERATOR`),
    KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COMMENT='操作日志表';
 
 
 
 
     
-- 动态明细查看埋点表
CREATE TABLE tongxue.`tongxue_bi_moment_view_count` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `OPERATOR` varchar(100) NOT NULL COMMENT '操作人',
  `MOMENT_ID`  bigint(20) DEFAULT NULL COMMENT '动态ID',
  `RESOURCE_CODE` varchar(64) NOT NULL COMMENT '来源',
  `CN` int(8) NOT NULL DEFAULT '1' COMMENT '数量',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`ID`),
  KEY `INDEX_OPERATOR` (`OPERATOR`),
  KEY `INDEX_RESOURCE_CODE` (`RESOURCE_CODE`),
  KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='动态明细查看埋点表';
     
-- 动态列表查看埋点表
CREATE TABLE tongxue.`tongxue_bi_moment_list_count` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `OPERATOR` varchar(100) NOT NULL COMMENT '操作人',
  `RESOURCE_CODE` varchar(64) NOT NULL COMMENT '来源',
  `CN` int(8) NOT NULL DEFAULT '0' COMMENT '数量',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`ID`),
  KEY `INDEX_OPERATOR` (`OPERATOR`),
  KEY `INDEX_RESOURCE_CODE` (`RESOURCE_CODE`),
  KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='动态列表查看埋点表';
 
 
-- 动态收藏埋点表
CREATE TABLE tongxue.`tongxue_bi_moment_collect_count` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `OPERATOR` varchar(100) NOT NULL COMMENT '操作人',
  `MOMENT_ID`  bigint(20) DEFAULT NULL COMMENT '动态ID',
  `TYPE` varchar(32) NOT NULL COMMENT '类型',
  `CN` int(8) NOT NULL DEFAULT '1' COMMENT '数量',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`ID`),
  KEY `INDEX_OPERATOR` (`OPERATOR`),
  KEY `INDEX_TYPE` (`TYPE`),
  KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='动态收藏埋点表';
 
 
-- 评论发布埋点表
CREATE TABLE tongxue.`tongxue_bi_comment_publish_count` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `OPERATOR` varchar(100) NOT NULL COMMENT '操作人',
    `COMMENT_ID`  bigint(20) DEFAULT NULL COMMENT '动态ID',
    `CN` int(8) NOT NULL DEFAULT '1' COMMENT '数量',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`ID`),
    KEY `INDEX_OPERATOR` (`OPERATOR`),
    KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='评论发布埋点表';
 
 
-- 动态点赞埋点表
CREATE TABLE tongxue.`tongxue_bi_moment_support_count` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `OPERATOR` varchar(100) NOT NULL COMMENT '操作人',
    `MOMENT_ID`  bigint(20) DEFAULT NULL COMMENT '动态ID',
    `TYPE` varchar(32) NOT NULL COMMENT '类型',
    `CN` int(8) NOT NULL DEFAULT '1' COMMENT '数量',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`ID`),
    KEY `INDEX_OPERATOR` (`OPERATOR`),
  KEY `INDEX_TYPE` (`TYPE`),
    KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='动态点赞埋点表';
 
-- 蹲动态埋点表
CREATE TABLE tongxue.`tongxue_bi_moment_crouch_count` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `OPERATOR` varchar(100) NOT NULL COMMENT '操作人',
    `MOMENT_ID`  bigint(20) DEFAULT NULL COMMENT '动态ID',
    `TYPE` varchar(32) NOT NULL COMMENT '类型',
    `CN` int(8) NOT NULL DEFAULT '1' COMMENT '数量',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`ID`),
    KEY `INDEX_OPERATOR` (`OPERATOR`),
  KEY `INDEX_TYPE` (`TYPE`),
    KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='蹲动态埋点表';
 
 
 
-- 关注好友埋点表
CREATE TABLE tongxue.`tongxue_bi_focus_friend_count` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `USER_NAME` varchar(100) NOT NULL COMMENT '用户',
    `FRIEND_NAME` varchar(100) NOT NULL COMMENT '朋友',
    `TYPE` varchar(32) NOT NULL COMMENT '类型',
    `CN` int(8) NOT NULL DEFAULT '1' COMMENT '数量',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`ID`),
    KEY `INDEX_USER_NAME` (`USER_NAME`),
  KEY `INDEX_TYPE` (`TYPE`),
    KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='关注好友埋点表';
 
-- 关注话题埋点表
CREATE TABLE tongxue.`tongxue_bi_focus_topic_count` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `USER_NAME` varchar(100) NOT NULL COMMENT '用户',
    `TOPIC_ID` bigint(20) DEFAULT NULL COMMENT '话题ID',
    `TYPE` varchar(32) NOT NULL COMMENT '类型',
    `CN` int(8) NOT NULL DEFAULT '1' COMMENT '数量',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`ID`),
    KEY `INDEX_USER_NAME` (`USER_NAME`),
  KEY `INDEX_TYPE` (`TYPE`),
    KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='关注话题埋点表';
 
 
-- 关注信息分析表
CREATE TABLE tongxue.`tongxue_bi_focus_statistics` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
    `REGISTERED_COUNT` int(8) NOT NULL DEFAULT '0' COMMENT '注册人数',
    `SINGLE_FOCUS_COUNT` int(8) NOT NULL DEFAULT '0' COMMENT '单向关注人数',
    `DOUBLE_FOCUS_COUNT` int(8) NOT NULL DEFAULT '0' COMMENT '双向关注人数',
    `FOCUS_USER_COUNT` int(8) NOT NULL DEFAULT '0' COMMENT '已发生关注行为总人数',
    `FOCUS_TOPIC_COUNT` int(8) NOT NULL DEFAULT '0' COMMENT '关注话题数',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`ID`),
    KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='关注信息分析表';
 
 
-- 内容消费信息分析表
CREATE TABLE tongxue.`tongxue_bi_moment_statistics` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
    `RECOMMEND_LIST_COUNT` int(8) NOT NULL DEFAULT '0' COMMENT '首页推荐浏览动态数',
    `RECOMMEND_VIEW_COUNT` int(8) NOT NULL DEFAULT '0' COMMENT '首页查看动态详情数',
    `RECOMMEND_DISLIKE_COUNT` int(8) NOT NULL DEFAULT '0' COMMENT '首页推荐不感兴趣数',
    `TOTAL_LIST_COUNT` int(8) NOT NULL DEFAULT '0' COMMENT '总浏览动态数',
    `TOTAL_VIEW_COUNT` int(8) NOT NULL DEFAULT '0' COMMENT '总查看动态详情数',
    `TOTAL_SHARE_COUNT` int(8) NOT NULL DEFAULT '0' COMMENT '总分享如流数',
    `TOTAL_COLLECT_COUNT` int(8) NOT NULL DEFAULT '0' COMMENT '总收藏数',
    `TOTAL_COMMENT_COUNT` int(8) NOT NULL DEFAULT '0' COMMENT '总评论数',
    `TOTAL_SUPPORT_COUNT` int(8) NOT NULL DEFAULT '0' COMMENT '总点赞数',
    `TOTAL_CROUCH_COUNT` int(8) NOT NULL DEFAULT '0' COMMENT '总蹲评论数',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`ID`),
    KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='内容消费信息分析表';
 
 
-- 同学圈页面浏览记录表
CREATE TABLE tongxue.`tongxue_bi_page_browse` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
    `PAGE_MARK` varchar(100) NOT NULL COMMENT '页面标记',
  `USER_NAME` varchar(100) NOT NULL COMMENT '用户',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`ID`),
    KEY `INDEX_USER_NAME` (`USER_NAME`),
    KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='同学圈页面浏览记录表';
 
 
-- 同学圈每分钟/访问数
CREATE TABLE tongxue.`tongxue_bi_page_browse_count` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
    `RECORD_DATE` datetime NOT NULL COMMENT '统计记录的时间',
    `RECORD_COUNT` int(11) DEFAULT '0' COMMENT '统计数量',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `UPDATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`ID`),
    KEY `INDEX_RECORD_DATE` (`RECORD_DATE`),
    KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='同学圈每分钟/人数';
 
 
-- 常规统计数据固化
CREATE TABLE tongxue.`tongxue_bi_general_count` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
    `BROWSE_COUNT` int(11) DEFAULT '0' COMMENT '浏览数统计(PV)',
  `VISITOR_COUNT` int(11) DEFAULT '0' COMMENT '访客数(UV)',
  `NEW_VISITOR_COUNT` int(11) DEFAULT '0' COMMENT '新访客数',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `UPDATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`ID`),
    KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='常规统计数据固化';
 
 
-- 同学圈发布动态记录表
CREATE TABLE tongxue.`tongxue_bi_publish_moment` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
    `PAGE_MARK` varchar(100) NOT NULL COMMENT '页面标记',
  `USER_NAME` varchar(100) NOT NULL COMMENT '用户',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`ID`),
    KEY `INDEX_USER_NAME` (`USER_NAME`),
    KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='同学圈发布动态记录表';
 
 
-- 同学圈内容生产统计表
CREATE TABLE tongxue.`tongxue_bi_content_output` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
    `HOME_PUB_COUNT` int(11) DEFAULT '0' COMMENT '首页发起动态数统计',
  `TOPIC_PUB_COUNT` int(11) DEFAULT '0' COMMENT '话题页发起动态数',
  `MOMENT_PUB_COUNT` int(11) DEFAULT '0' COMMENT '发起动态数',
  `PUB_COMPLETION_COUNT` int(11) DEFAULT '0' COMMENT '完成动态发布数',
  `HAVE_OFF_TOPIC_COUNT` int(11) DEFAULT '0' COMMENT '插入官方话题数',
  `HAVE_CUSTOM_TOPIC_COUNT` int(11) DEFAULT '0' COMMENT '插入自定义话题数',
  `HAVE_AT_COUNT` int(11) DEFAULT '0' COMMENT '@同学数',
  `HAVE_IMGE_COUNT` int(11) DEFAULT '0' COMMENT '插入图片数',
  `HAVE_VIDEO_COUNT` int(11) DEFAULT '0' COMMENT '插入视频数',
  `HAVE_LINK_COUNT` int(11) DEFAULT '0' COMMENT '插入链接数',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `UPDATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`ID`),
    KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='同学圈内容生产统计表';
 
 
-- 同学圈评论生产统计表
CREATE TABLE tongxue.`tongxue_bi_comment_output` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
    `COMMENT_COUNT` int(11) DEFAULT '0' COMMENT '发表评论数',
  `HAVE_AT_COUNT` int(11) DEFAULT '0' COMMENT '@同学数',
  `HAVE_IMGE_COUNT` int(11) DEFAULT '0' COMMENT '插入图片数',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `UPDATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`ID`),
    KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='同学圈内容生产统计表';
 
 
-- 用户留存分析表
CREATE TABLE tongxue.`tongxue_bi_retention_statistics` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  
  `REGISTERED_COUNT` int(8) NOT NULL DEFAULT '0' COMMENT '注册人数',
  `T1` int(8) COMMENT '第1日留存用户数',
  `T2` int(8) COMMENT '第2日留存用户数',
  `T3` int(8) COMMENT '第3日留存用户数',
  `T7` int(8) COMMENT '第7日留存用户数',
    `T30` int(8) COMMENT '第30日留存用户数',
  `CREATE_DATE` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`ID`),
    KEY `INDEX_CREATE_DATE` (`CREATE_DATE`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='用户留存分析表';
DML语句：
DML
-- 初始化xxx配置
insert into ……
```

