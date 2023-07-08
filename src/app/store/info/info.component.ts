import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  expandedItems: number[] = [];
  levels: any[] = [
    {
      title: 'צורה 1',
      imageUrl: 'https://dragonballz.co.il/wp-content/uploads/2015/02/Frieza_1st_Form.png',
      description: "הוא לוקח מעט כוח כדי להשתמר. זה השלב הכי חלש של פריז, לרב הוא מסתובב על ה'כיסא' הזה שלו ויש לו קול מאוד נשי. לראשונה הוא מופיע בסגת נאמק על כוכב נאמק בחיפוש אחרי כדורי הדרגון בול. פעמיים מדגישים את כוחו האדיר, כשקאיו מדבר עם גוקו ומזהיר אותו מפניו וכשגוהאן וקרירין הרגישו בעוצמתו האדירה (כשהוא עדיין בשלב הראשון!). פריז הגיע לעוצמה אנרגטית של 530,000 בשלב זה."
    },
    {
      title: 'צורה 2',
      imageUrl: 'https://dragonballz.co.il/wp-content/uploads/2015/02/356463-14_super.png',
      description: "בשלב הזה הגובה של פריז הוא 2.67 מטר. הקרניים שלו צומחות לכיוון מעלה, וכמו כן המהירות והכוח שלו גדלים. זה אחד משני שלבים שבהם יכול פריז להאריך את זנבו. פריז הגיע לעוצמה אנרגטית של 1,000,000 בשלב זה."
    },
    {
      title: 'צורה 3',
      imageUrl: 'https://dragonballz.co.il/wp-content/uploads/2015/02/Frieza_Third_Form.png',
      description: "בשלב הזה פריז מצטמק לגובה של 1.94 מטר. הראש שלו מתארך לאורך של מטר. כל היכולות שלו משתלשות מהשלב השני. פריז הגיע לעוצמה אנרגטית של 2,500,000 בשלב זה."
    },
    {
      title: 'צורה סופית',
      imageUrl: 'https://dragonballz.co.il/wp-content/uploads/2015/02/Freeza.jpg',
      description: `פריזה בצורה הזאת, נראה חלש ביותר, ואפילו צחקו עליו שהוא נראה "קטן יותר" >אבל להפך, זאת הצורה החזקה והאכזרית ביותר של פריזה שלא חלם שהוא יצטרך להשתמש בה. `
    },
    {
      title: 'מקסימום כוח',
      imageUrl: 'https://dragonballz.co.il/wp-content/uploads/2015/02/Frieza100MaximumPower.png',
      description: `זה לא בדיוק שלב ממשי. הוא פשוט טוען את עצמו לעוצמתו המקסימלית. הוא מתנפח מעט, אך בגלל הנפח שלו, הכוח עולה, אבל המהירות שלו מידרדרת במעט, מה שכנראה גרם לנפילה שלו. פריז הגיע לעוצמה אנרגטית של 120,000,000 בשלב זה.`
    },
    {
      title: 'פריזה מתכתי',
      imageUrl: 'https://dragonballz.co.il/wp-content/uploads/2015/02/FriezaFinalFormRobotNV.png',
      description: `זה פריז שנבנה מחדש על-ידי אבא שלו, המלך קולד. הוא שופר על-ידי אבא שלו, והוא ניהיה הרבה יותר חזק ממקודם, אבל הוא לא השתווה לטראנקס והפסיד.   הגוף שלו חצי רגיל וחצי ממתכת.`
    },
    
    {
      title: 'גולדן פריזה',
      imageUrl: 'https://dragonballz.co.il/wp-content/uploads/2015/02/Golden-Frieza-1024x576.jpg',
      description: `אז לאחר חזרתו של פריזה לחיים, אנחנו רואים בסרט "תחייתו של פריזה" צורה חדשה ומדהימה! \n פריזה אמר שהוא לעולם לא התאמן, ואם הוא ייתאמן כוחו יגיע לעוצמות מפחידות ביותר. \n  וככה היה למרות הכוח הרב שלו, הוא הקדים לחזור לכדור הארץ, לפני שהוא יכול לשלוט על העוצמה הזאת ב100% \n אבל ללא ספק מדובר בצורה הכי חזקה שהוא יכול להגיע אליה(כנראה :D ) `
    },

    
  ];

  constructor() { }

  ngOnInit(): void {
  }
  toggleItem(item: number): void {
    if (this.expandedItems.includes(item)) {
      this.expandedItems = this.expandedItems.filter(i => i !== item);
    } else {
      this.expandedItems.push(item);
    }
  }
  

}
