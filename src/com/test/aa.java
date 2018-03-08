package com.test;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/** * @author  作者 E-mail: * @date 创建时间：2016年4月20日 下午2:11:09 * @version 1.0 * @parameter  * @since  * @return  */
public class aa {
	//后台获取当前系统时间
	public static void main(String[] args) throws ParseException {
		// TODO Auto-generated method stub
		//1.获取当前时间
		/*Date day=new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		System.out.println(df.format(day));*/
	    //2.获取当前时间
	    	/*Date nowTime = new Date(System.currentTimeMillis());
		  SimpleDateFormat sdFormatter = new SimpleDateFormat("yyyy-MM-dd");
		  String retStrFormatNowDate = sdFormatter.format(nowTime);
		  System.out.println(retStrFormatNowDate);*/
		//3.获取当前时间
		Calendar calendar = Calendar.getInstance();  
	  /*  String str = (new SimpleDateFormat("yyyy-MM-dd")).format(calendar.getTime());  
	    System.out.println(str); */
		// 创建 Calendar 对象  
	    Calendar calendar1 = Calendar.getInstance();   
	      // 对 calendar 设置时间的方法  
	      // 设置传入的时间格式  
	      SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");  
	      // 指定一个日期  
	      String strDate = "2016-04-20";
	      Date date = dateFormat.parse(strDate);  
	      // 对 calendar 设置为 date 所定的日期  
	      calendar1.setTime(date);  
	  
	      // 按特定格式显示刚设置的时间  
	    /*  String str1 = (new SimpleDateFormat("yyyy-MM-dd")).format(calendar1.getTime());  
	      System.out.println(str1); */
	      int a = getDaysBetween(calendar1,calendar);
	      System.out.println(a);
	}
	
	/** 
     * 获取两个日期之间的实际天数，支持跨年 
     */ 
	public static int getDaysBetween(Calendar start, Calendar end){  
        if(start.after(end)){  
            Calendar swap = start;  
            start = end;  
            end = swap;  
        }  
        int days = end.get(Calendar.DAY_OF_YEAR)- start.get(Calendar.DAY_OF_YEAR);  
        int y2 = end.get(Calendar.YEAR);  
        if (start.get(Calendar.YEAR) != y2) {  
            start = (Calendar) start.clone();  
            do {  
                days += start.getActualMaximum(Calendar.DAY_OF_YEAR);  
                start.add(Calendar.YEAR, 1);  
            }while(start.get(Calendar.YEAR) != y2);  
        }  
        return days;  
    }  

}
