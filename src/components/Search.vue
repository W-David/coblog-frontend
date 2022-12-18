<template>
  <div class="search-container">
    <el-autocomplete
      v-model="queryText"
      :fetch-suggestions="querySearch"
      clearable
      placeholder="标题 / 标签 / 类别"
      @select="handleQuery"
    >
      <template #suffix>
        <el-icon @click="handleQuery"><i-search /></el-icon>
      </template>
      <template #default="{ item }">
        <div class="ac-content">
          <div class="ac-type">
            <svg-icon class-name="svg-article" v-if="item.type === 'article'" icon-class="article"></svg-icon>
            <svg-icon class-name="svg-tag" v-else-if="item.type === 'tag'" icon-class="tag"></svg-icon>
            <svg-icon class-name="svg-category" v-else icon-class="category"></svg-icon>
          </div>
          <div class="ac-val">{{ item.value }}</div>
        </div>
      </template>
    </el-autocomplete>
  </div>
</template>

<script setup>
import { reactive, ref, toRef, toRefs, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { navbarSearch } from '@/api/search'

const router = useRouter()
const queryText = ref('')
const queryResList = ref([])
const handleQuery = ({ type, id }) => router.push({ name: type, params: { id } })
const createFilter = qs => restaurant => restaurant.value.toLowerCase().indexOf(qs.toLowerCase()) === 0
const getQueryResList = async qs => {
  if (!qs) return
  const res = await navbarSearch(qs)
  if (res.code !== 200) return
  queryResList.value = res.data || []
}
const querySearch = async (qs, callback) => {
  await getQueryResList(qs)
  const results = qs ? queryResList.value.filter(createFilter(qs)) : []
  callback(results)
}
</script>

<style lang="scss" scoped>
.search-container {
  &:deep {
    .el-input {
      width: 180px;
      .el-input__wrapper {
        border-radius: 16px;
        .el-input__suffix {
          .el-icon {
            color: #ccc;
            cursor: pointer;
            &:hover {
              color: $primary-color;
            }
          }
        }
      }
    }
  }
}
</style>
