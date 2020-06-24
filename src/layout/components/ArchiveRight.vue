<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="item-title">
        <span>最新文章</span>
      </div>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="RPC" name="1" class="item-header">
          <div>DUBBO 迈向云原生的里程碑 | 应用级服务发现</div>
          <div class="item-date">2020-06-16</div>
        </el-collapse-item>
        <el-collapse-item title="ARTHAS" name="2" class="item-header">
          <div>平滑迁移 DUBBO 服务的思考</div>
          <div class="item-date">2020-05-30</div>
        </el-collapse-item>
        <el-collapse-item title="技术杂谈" name="3">
          <div>ARTHAS | 定位线上 DUBBO 线程池满异常</div>
          <div class="item-date">2020-02-16</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        <span>分类</span>
      </div>
      <div>
        <el-tree
          :data="data"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ArchiveRight',
  data() {
    return {
      activeName: '1',
      data: [{
        label: 'Docker',
        children: [{
          label: 'Docker Network—Bridge 模式'
        }]
      }, {
        label: 'JAVA',
        children: [{
          label: 'Dubbo 迈向云原生的里程碑 | 应用级服务发现'
        }, {
          label: '平滑迁移 Dubbo 服务的思考'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>
<style lang="scss" scope>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,700");

.item-title {
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
}
.item-header .el-collapse-item__header {
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
}

.item-date {
  color: #aaa;
  font-size: 13px;
  text-transform: uppercase;
}

</style>
