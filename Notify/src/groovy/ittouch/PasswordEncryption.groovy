package ittouch

import java.security.MessageDigest
import sun.misc.BASE64Decoder
import sun.misc.BASE64Encoder

public class PasswordEncryption {
	
	private final static String SITE_SALT = "T0cpfZYfXCyl7zdZ";
	private final static int REHASH_AMOUNT = 16;
		
	public static String encrypt(String salt, String password){
		try{
			MessageDigest md256 = MessageDigest.getInstance("SHA-256");
			MessageDigest md512 = MessageDigest.getInstance("SHA-512");
			
			password = SITE_SALT + password + SITE_SALT;
						
			md256.reset();
						
			byte[] s = salt.getBytes("UTF-8");
			byte[] input = md256.digest(password.getBytes("UTF-8"));
			for (int i = 0; i < REHASH_AMOUNT; i++) {
				md512.reset();
				md512.update(s);
				md512.update(input);
				input = md512.digest(s);
			}
			return javax.xml.bind.DatatypeConverter.printBase64Binary(input);
		}
		catch(Exception e){
			return "";
		}
	}
}
