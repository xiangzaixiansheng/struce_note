'''
 * @lc app=leetcode.cn id=7 lang=python3
 *
 * [7] 整数反转
 *
 * https://leetcode-cn.com/problems/reverse-integer/description/
 *
 * algorithms
 * Easy (31.16%)
 * Total Accepted:    75.3K
 * Total Submissions: 241.4K
 * Testcase Example:  '123'
 *
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 *
 * 示例 1:
 *
 * 输入: 123
 * 输出: 321
 *
 *
 * 示例 2:
 *
 * 输入: -123
 * 输出: -321
 *
 *
 * 示例 3:
 *
 * 输入: 120
 * 输出: 21
 *
 *
 * 注意:
 *
 * 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
 *
 *
'''

# 方法一：变成字符串反转
class Solution:
    def reverse(self, x: int) -> int:
        plus_minus = ''
        if x < 0:
            plus_minus = '-'
            # 变成正的
            x = -x
        x = str(x)
        # 反转字符串
        reverse_x = x[::-1]
        reverse_x = plus_minus+reverse_x

        if int(reverse_x) > pow(2, 31)-1 or int(reverse_x) < pow(-2, 31):
            return 0
        return int(reverse_x)

# 正常思路就是 利用余数*10累加的方法完成。需要注意的是，python对整数除法采用“向下取整”机制，所以正数和负数要区别运算

class Solution2:
    def reverse(self, x: int) -> int:
        num = 0
        if x ==0:
            return 0
        print("-----1")
        if x < 0:
            # 先变成正数
            x = -x
            while x!=0:
                num = num*10+x%10
                x = x//10
            num = -num
        else:
            print("-----2")
            while x!=0:
                num = num*10+ x%10
                print("-----num", num)
                x=x//10
        if num > pow(2, 31)-1 or num < pow(-2, 31):
            return 0
        return num

if __name__ == "__main__":
    print(Solution2().reverse(123))
