<template>
	<div class="search-container">
		<el-autocomplete
			v-model="queryText"
			:fetch-suggestions="querySearch"
			clearable
			placeholder="标题 / 标签 / 类别"
			@select="handleQuery">
			<template #suffix>
				<el-icon @click="handleQuery"><i-search></i-search></el-icon>
			</template>
			<template #default="{ item }">
				<div class="ac-content">
					<div class="ac-type">
						<svg-icon
							v-if="item.type === 'article'"
							class-name="svg-article"
							icon-class="article"></svg-icon>
						<svg-icon
							v-else-if="item.type === 'tag'"
							class-name="svg-tag"
							icon-class="tag"></svg-icon>
						<svg-icon
							v-else
							class-name="svg-category"
							icon-class="category"></svg-icon>
					</div>
					<div class="ac-val">{{ item.value }}</div>
				</div>
			</template>
		</el-autocomplete>
	</div>
</template>

<script setup>
import { navbarSearch } from '@/api/search'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const queryText = ref('')
const handleQuery = ({ type, id }) => router.push({ name: type, params: { id } })
const querySearch = async (qs, callback) => {
	if (!qs) return
	const res = await navbarSearch(qs)
	if (res.code !== 200) return
	const results = res.data ?? []
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
							color: var(--el-color-primary);
						}
					}
				}
			}
		}
	}
}
</style>
