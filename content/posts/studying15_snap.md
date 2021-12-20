---
title: "배너를 만들어보자!"
date: 2021-12-13T17:46:19+09:00
tags: ["unity","banner","snap"]
categories: ["unity"]
author: [""]
ShowReadingTime: true
ShowBreadCrumbs: false
ShowPostNavLinks: true
ShowCodeCopyButtons: true
ShowCreativeCommons: true
showToc: true
TocOpen: true
comments: true
disableShare: false
searchHidden: false
cover:
  hidden: true
  image: "/logo/logo-unity-01.png"
  alt: "unity"

draft: false
---

아래 이미지는 만든 배너의 모습이다.
UI리소스는 친구가 만들어줬다..ㅎㅎ

![배너](/images/studying15_0.PNG)

💚 만들면서 고민한 것들.

- 오브젝트 풀을 사용할 것인가? 

<br>

게임 배너는 보통 오브젝트 풀을 사용할 만큼 갯수가 많지 않다. 그래서 사용하지 않기로 결정! 후에 인벤토리 같은 기능을 만들어 때 사용해보도록 하자!

- 자동으로 움직이게 해보자!

<br>

한쪽 방향으로 움직이는 배너를 구현하였다. 각 배너마다 유저가 정보를 습득할 수 있는 시간 또한 주었다.

- Snap 기능

<br>

유저가 스크롤 뷰를 조작해 해당 배너의 위치를 기준으로 일정부분을 움직였다면, 조작을 끝냈을 때 이전 배너, 다음 배너 또는 원래 배너로 다시 positioning!

- 버튼 추가

<br>

각 banner로 바로 이동할 수 있는 버튼을 추가! 해당 banner로 이동할 때 바로 보여주는 것이 아닌, 이동 연출을 보여주었다.

🍑 snap
```csharp
void ScrollSnap(Vector2 value) //ScrollRect.onValueChanged.AddListener(ScrollSnap)에 추가해줌.
{
    //유저가 스크롤을 조작하고 있는 경우 or 오토무브가 가능한 경우 or 배너가 움직이는 중일 경우(버튼 조작으로) 
    if (BannerScrollRect.isOnDown || isAbleAutoMove || isBannerMoving)
    {
        return;
    }
    if (value.x > points[curBannerIndex]) //오른쪽 snap
    {
        if (value.x >= points[curBannerIndex] + snapRange)
        {
            var nextIndex = curBannerIndex + 1 >= datas.Length ? 0 : curBannerIndex + 1;
            MoveBannerByIndex(nextIndex);//해당인덱스로 이동
        }
        else
        {
            MoveBannerByIndex(curBannerIndex);
        }
    }
    else //왼쪽 snap
    {
        if (value.x <= points[curBannerIndex] - snapRange)
        {
            var prevIndex = curBannerIndex - 1 < 0 ? 0 : curBannerIndex - 1;
            MoveBannerByIndex(prevIndex);
        }
        else
        {
            MoveBannerByIndex(curBannerIndex);
        }
    }
}
```
🍑 배너 이동 코루틴

<br>

이전에 포스팅했던 타이머를 활용해보자!!

```csharp
IEnumerator CoMoveBanner(int index)
{
    curBannerIndex = index;
    indexButtons[curBannerIndex].SelectWithoutNotify(true);
    
    var timer = 0f;
    var startPoint = BannerScrollRect.ScrollRect.horizontalNormalizedPosition;
    
    while (timer < duration) //duration 동안 이동
    {
        timer += Time.deltaTime;
        //스크롤 포인트 조절! lerp를 사용하여 부드럽게 이동시키자!
        BannerScrollRect.ScrollRect.horizontalNormalizedPosition = Mathf.Lerp(startPoint, points[index], ease.Evaluate(timer / duration));
        yield return null;
    }
    isAbleAutoMove = true;//오토무브 가능으로 변경
    isBannerMoving = false;//배너 움직임이 끝났음을 알림
    autoTimer = 0; //무브를 조작했다면 오토무브 타이머를 초기화 
}
```