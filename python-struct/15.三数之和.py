#
# @lc app=leetcode.cn id=15 lang=python3
#
# [15] 三数之和
#
# https://leetcode.cn/problems/3sum/description/
#
# algorithms
# Medium (36.79%)
# Likes:    5832
# Dislikes: 0
# Total Accepted:    1.3M
# Total Submissions: 3.6M
# Testcase Example:  '[-1,0,1,2,-1,-4]'
#
# 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j !=
# k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
#
# 你返回所有和为 0 且不重复的三元组。
#
# 注意：答案中不可以包含重复的三元组。
#
#
#
#
#
# 示例 1：
#
#
# 输入：nums = [-1,0,1,2,-1,-4]
# 输出：[[-1,-1,2],[-1,0,1]]
# 解释：
# nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
# nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
# nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
# 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
# 注意，输出的顺序和三元组的顺序并不重要。
#
#
# 示例 2：
#
#
# 输入：nums = [0,1,1]
# 输出：[]
# 解释：唯一可能的三元组和不为 0 。
#
#
# 示例 3：
#
#
# 输入：nums = [0,0,0]
# 输出：[[0,0,0]]
# 解释：唯一可能的三元组和为 0 。
#
#
#
#
# 提示：
#
#
# 3 <= nums.length <= 3000
# -10^5 <= nums[i] <= 10^5
#
#
#

# 排序后固定一个数nums[i]
# 1. 固定一个数nums[i]若是>0 那么和必然不等于0 跳过
# 2. 若是nums[i] == nums[i+1], 则去重, 跳过
# 3. 若是nums[i] < 0,则向后生成两个指针left和right
# 若是nums[left] == nums[left+1] 则left++
# 若是nums[right] == nums[right-1] 则right--

# @lc code=start
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        _length = len(nums)
        _result_list = []

        # 长度小于3 直接返回空数组
        if _length < 3:
            return _result_list
        # 排序
        nums.sort()
        for _index in range(_length):
            # 当前数字大于0 的时候 直接返回了
            if nums[_index] > 0:
                break
            # 当前数字和前面的数字相同的时候 跳过
            if _index > 0 and nums[_index] == nums[_index-1]:
                continue

            l = _index+1
            r = _length-1
            # 开始遍历大法
            while l < r:
                _sum = nums[_index]+ nums[l]+nums[r]
                if _sum ==0:
                    _result_list.append([nums[_index], nums[l] , nums[r]])
                    # 需要处理相同的数字
                    while l < r and nums[r] == nums[r-1]:
                        # 去重复
                        r-=1
                    while l < r and nums[l] == nums[l+1]:
                        # 去重复
                        l+=1
                    # 开始移动
                    l+=1 
                    r-=1 
                elif _sum < 0:
                    l+=1 
                else : # _sum > 0的情况
                    r-=1

        return _result_list               


# @lc code=end
if __name__ == '__main__':
    nums = [-1,0,1,2,-1,-4]
    print(Solution().threeSum(nums))