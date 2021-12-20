---
title: "AlgorithmStudy_백준 2941"
date: 2021-11-23T22:12:06+09:00
tags: ["csharp", "알고리즘", " 백준"]
categories: ["algorithm"]
series: ["BAEKJOON Online Judge"]
chapter: [""]
author: ["Hyemi Oh"]
ShowReadingTime: true
ShowBreadCrumbs: false
ShowPostNavLinks: true
ShowCodeCopyButtons: true
ShowCreativeCommons: true
ShowToc: true
TocOpen: false
ShowTocAside: true
comments: true
disableShare: false
searchHidden: false
cover:
  hidden: true
  image: ""
  alt: ""

draft: false
---

# 알고리즘 공부 {{< color color="#FFD400" text="백준 2941" >}} 🧐
#### 크로아티아 알파벳

## 👉문제
예전에는 운영체제에서 크로아티아 알파벳을 입력할 수가 없었다. 따라서, 다음과 같이 크로아티아 알파벳을 변경해서 입력했다.

![표](/images/algorithm13.png)

예를 들어, ljes=njak은 크로아티아 알파벳 6개(lj, e, š, nj, a, k)로 이루어져 있다. 단어가 주어졌을 때, 몇 개의 크로아티아 알파벳으로 이루어져 있는지 출력한다.

dž는 무조건 하나의 알파벳으로 쓰이고, d와 ž가 분리된 것으로 보지 않는다. lj와 nj도 마찬가지이다. 위 목록에 없는 알파벳은 한 글자씩 센다.  


<br>

## 👉입력  
첫째 줄에 최대 100글자의 단어가 주어진다. 알파벳 소문자와 '-', '='로만 이루어져 있다.

단어는 크로아티아 알파벳으로 이루어져 있다. 문제 설명의 표에 나와있는 알파벳은 변경된 형태로 입력된다.


<br>

## 👉출력
입력으로 주어진 단어가 몇 개의 크로아티아 알파벳으로 이루어져 있는지 출력한다.

<br>

🍑풀이
```csharp
using System;
using System.Collections.Generic;
using System.Text;

namespace Algorithm13
{
    class Baekjoon2941
    {
        static void Main(string[] args)
        {
            List<string> list = new List<string> {"c=", "c-", "dz=", "d-", "lj", "nj", "s=", "z="};

            var input = new StringBuilder(Console.ReadLine());

            foreach (var s in list)
            {
                input.Replace(s, "*");//해당되는 문자열을 다른 문자로 변경
            }
            Console.WriteLine(input.Length);//문자열의 길이 출력
        }
        
    }
}

```

<br>

[문제풀러가기](https://www.acmicpc.net/problem/2941)