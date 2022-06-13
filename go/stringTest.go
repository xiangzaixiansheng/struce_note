package main

import (
	"fmt"
	"strconv"
	"strings"
)

func checkError(e error) {
	if e != nil {
		fmt.Println(e)
	}
}

func main() {
	//是否包含
	fmt.Println(strings.Contains("hello_word", "hello"))

	// func Join(a []string, sep string) string
	// Join 字符串连接，将slice a通过sep连接
	fmt.Println(strings.Join([]string{"hello", "world"}, "-"))

	// func Index(s, substr string) int
	// Index 在字符串s中查找substr所在的位置，返回位置值，找不到返回-1
	fmt.Println(strings.Index("hello-world", "-"))

	// func Repeat(s string, count int) string
	// Repeat 重复s，count次，返回重复的字符串
	fmt.Println(strings.Repeat("hello", 5))

	// func Replace(s, old, new string, n int) string
	// Replace 在字符串s中，把old字符串替换成new字符串，替换n次（n<0表示全部替换），最后返回替换后的字符串
	fmt.Println(strings.Replace("ccoo ccoo ccoo", "co", "xo", 2))
	fmt.Println(strings.Replace("ccoo ccoo ccoo", "co", "xo", -1))

	// Split(s, sep string) []string
	// Split 把字符串按照sep分割，返回分割后的slice
	fmt.Println(strings.Split("I love you", " "))
	fmt.Println(strings.Split(" zxy ", ""))

	// Trim(s string, cutset string) string
	// Trim 将s字符串的首尾去除cutset指定的字符串
	fmt.Println(strings.Trim("!!!!!I Love you!!!!!", "!"))

	// func Fields(s string) []string
	// Fields 去除s字符串的空格字符，并按照空格分割返回slice
	fmt.Println(strings.Fields("  I love you   !  "))

	// Append 系列函数将整数等转换成字符串后，添加到现有的字节数组中
	str := make([]byte, 0, 100)

	// func AppendInt(dst []byte, i int64, base int) []byte
	str = strconv.AppendInt(str, 123, 10)
	fmt.Println(string(str))

	// func AppendFloat(dst []byte, f float64, fmt byte, prec, bitSize int) []byte
	str = strconv.AppendFloat(str, 3.141592, 'f', 4, 64) // 'f'换成'e'便是科学计数法
	fmt.Println(string(str))

	// func AppendBool(dst []byte, b bool) []byte
	str = strconv.AppendBool(str, false) // <==> append(str, "false"...)
	fmt.Println(string(str))

	// func AppendBool(dst []byte, b bool) []byte
	str = strconv.AppendBool(str, false) // <==> append(str, "false"...)
	fmt.Println(string(str))

	// func AppendQuote(dst []byte, s string) []byte
	str = strconv.AppendQuote(str, "hello world") // 包括双引号
	fmt.Println(string(str))

	// func AppendQuoteRune(dst []byte, r rune) []byte
	str = strconv.AppendQuoteRune(str, '当')
	fmt.Println(string(str))

	// Format 系列函数把其他类型转换成字符串
	// func FormatBool(b bool) string
	a := strconv.FormatBool(true) // bool类型转换成字符串

	// func FormatInt(i int64, base int) string
	b := strconv.FormatInt(10, 2) // 整数10转换成二进制的字符串

	// func FormatUint(i uint64, base int) string
	c := strconv.FormatUint(123, 10) // 无符号intint类型转换成十进制的字符串

	// func Itoa(i int) string
	d := strconv.Itoa(10) // <==> strconv.FormatInt(int64(i), 10)
	fmt.Println(a, b, c, d)

	// Parse 系列函数把字符串转换为其他类型
	// func ParseBool(str string) (bool, error)
	aa, err := strconv.ParseBool("false")
	checkError(err)

	// func ParseFloat(s string, bitSize int) (float64, error)
	bb, err := strconv.ParseFloat("123.23", 64)
	checkError(err)

	// func ParseInt(s string, base int, bitSize int) (i int64, err error)
	cc, err := strconv.ParseInt("1011", 2, 64)
	checkError(err)

	// func ParseUint(s string, base int, bitSize int) (uint64, error)
	dd, err := strconv.ParseUint("12345", 10, 64)
	checkError(err)

	// func Atoi(s string) (int, error)
	ee, err := strconv.Atoi("1023") // <==> ParseInt(s, 10, 0)
	checkError(err)
	fmt.Println(aa, bb, cc, dd, ee) //false 123.23 11 12345 1023

}
