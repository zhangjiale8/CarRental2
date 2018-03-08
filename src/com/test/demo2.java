package com.test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/** * @author  作者 E-mail: * @date 创建时间：2016年4月20日 下午2:59:00 * @version 1.0 * @parameter  * @since  * @return  */
public class demo2 {

	public static void main(String[] args) throws ParseException {
		// TODO Auto-generated method stub
		/*data默认有toString()
		输出格林威治时间，比如说Date date = new Date();
		String toStr = date.toString();
		输出的结果类似于：
		Wed Sep 16 19:02:36 CST 2012
		你要输出yyyy-MM-dd hh:mm:ss这种格式的话，
		使用SimpleDataFormat类

		比如
		Date date = new Date();

		String dateStr = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(date);
		System.out.println(dateStr);
		输出结果像下面这样：

		2009-09-16 07:02:36当然啦，你也可以把：hh:mm:ss去掉，输出的结果也就只有年-月-日了 */
		//String类型转化成Date类型
		SimpleDateFormat sim=new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		String str="2011-5-31 14:40:50";
		Date d=sim.parse(str);
		System.out.println(sim.format(d));
		
	}

}
