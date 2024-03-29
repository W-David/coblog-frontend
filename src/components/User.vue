<template>
	<div class="user-container">
		<el-avatar
			:size="36"
			shape="circle"
			:src="`${avatar}?x-oss-process=image/resize,m_fill,h_36,w_36`"
			fit="cover"
			@click.stop="tapAvatar">
			<span>{{ userInfo.username.substr(0, 1) }}</span>
		</el-avatar>
		<el-dropdown class="hidden-sm-and-down">
			<span class="dropdown-link">
				Hello, {{ userInfo.username }}
				<el-icon class="el-icon--right">
					<i-arrow-down></i-arrow-down>
				</el-icon>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item>
						<span @click="toUserInfo">用户信息</span>
					</el-dropdown-item>
					<el-dropdown-item>
						<span @click="logout">退出登录</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
	<teleport to="#rootUserInfo">
		<el-dialog
			v-model="openUserInfo"
			center
			:show-close="false"
			:width="dialogWidth">
			<div class="avatar-container">
				<avatar-upload
					:is-uploaded="!!avatar"
					:img-url="avatar"
					trig-hint="上传头像"
					descrip-hint="头像"
					@on-upload="handleUpload"
					@on-delete="handleDelete"></avatar-upload>
			</div>
			<div class="info-container">
				<div class="info-name">
					<span class="info-hint">昵称 -</span>
					<span
						v-if="!isEN"
						class="info-content"
						@click="isEN = true">
						{{ userForm.username || '暂无昵称' }}
					</span>
					<input
						v-else
						v-model="userForm.username"
						@blur="isEN = false" />
				</div>
				<div class="info-email">
					<span class="info-hint">邮箱 -</span>
					<span
						v-if="!isEE"
						class="info-content"
						@click="isEE = true">
						{{ userForm.email }}
					</span>
					<input
						v-else
						v-model="userForm.email"
						@blur="isEE = false" />
				</div>
			</div>
			<template #header>
				<span class="user-info-title">用户信息</span>
			</template>
			<template #footer>
				<div class="user-info-footer">
					<el-button
						type="danger"
						plain
						@click="handleCancel">
						取消
					</el-button>
					<el-button
						type="danger"
						@click="handleUpdate">
						修改
					</el-button>
				</div>
			</template>
		</el-dialog>
	</teleport>
</template>

<script setup>
import {computed, ref, reactive} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import AvatarUpload from '@/components/FileUpload.vue'
import useDOMCreate from '@/hooks/useDOMCreate'

useDOMCreate('rootUserInfo')
const store = useStore()
const router = useRouter()
const avatar = computed(() => store.getters.userAvatar)
const userInfo = computed(() => store.getters.userInfo)
const userForm = reactive({
	username: userInfo.value.username,
	email: userInfo.value.email
})
const deviceSize = computed(() => store.getters.deviceSize)
const dialogWidth = computed(() => {
	const dv = deviceSize.value
	return dv === 'xl' || dv === 'lg' ? '30%' : dv === 'md' ? '40%' : dv === 'sm' ? '60%' : '90%'
})
const openUserInfo = ref(false)
const isEN = ref(false)
const isEE = ref(false)

const toUserInfo = () => {
	openUserInfo.value = true
}
const tapAvatar = () => {
	const isSM = deviceSize.value === 'xs' || deviceSize.value === 'sm'
	if (!isSM) return
	store.dispatch('app/ToggleSidebar', false)
	openUserInfo.value = true
}
const logout = async () => {
	await store.dispatch('user/Logout')
	router.push({name: 'login'})
}
const handleCancel = () => {
	openUserInfo.value = false
}
const handleUpdate = async () => {
	const isSuccess = await store.dispatch('user/SetUserInfo', userForm)
	openUserInfo.value = false
	ElMessage({
		message: isSuccess ? '更新成功' : '更新失败',
		type: isSuccess ? 'success' : 'error'
	})
}
const handleUpload = async file => {
	const isSuccess = await store.dispatch('user/SetAvatar', {store, file})
	ElMessage({
		message: isSuccess ? '头像上传成功' : '上传失败',
		type: isSuccess ? 'success' : 'error'
	})
}
const handleDelete = async () => {
	const isSuccess = await store.dispatch('user/DeleteAvatar')
	ElMessage({
		message: isSuccess ? '已删除' : '删除失败',
		type: isSuccess ? 'success' : 'error'
	})
}
</script>

<style lang="scss" scoped>
.user-container {
	@include flex-box(row, center, center);

	:deep .el-dropdown {
		margin-left: 8px;
		.dropdown-link {
			cursor: pointer;
		}
	}
}
.avatar-container {
	@include layout(100%, 220px, 0, 0);
}
.info-container {
	.info-name,
	.info-email {
		@include layout(100%, auto, 12px 0, 12px);
		@include box-shadow(inset 2px 2px 4px var(--el-color-info-light-7), inset -1px -1px 2px var(--el-color-info-light-7));

		html.dark & {
			@include box-shadow(inset 2px 2px 4px rgba(0, 0, 0, 0.2), inset -1px -1px 2px rgba(0, 0, 0, 0.2));
		}

		@include border(1px solid transparent, 8px);
		@include pointer;
		.info-hint {
			font-weight: bold;
			color: var(--el-color-danger);
		}
		.info-content {
			color: var(--el-text-color-secondary);
			&:hover {
				color: var(--el-text-color-primary);
			}

			html.dark & {
				color: #dedede;
				&:hover {
					color: #eee;
				}
			}
		}
		input {
			font-size: 15px;
			margin: 0;
			padding: 0;
			border: none !important;
			outline: none !important;

			html.dark & {
				background-color: #141414;
			}
		}
	}
}
.user-info-title {
	color: var(--el-color-danger);
	font-size: 18px;
	font-weight: bold;
}
.user-info-footer {
	@include layout(100%, auto, 0, 0);
	@include flex-box(row, space-between, center);
}
</style>
