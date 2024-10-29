package com.DecryptionUTIL.CodeUTIL();
 
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;
 
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
 
 
 
public class CSBUtil {
 
	public static void main(String[] args) throws NoSuchAlgorithmException, InvalidKeySpecException, InvalidKeyException, NoSuchPaddingException, InvalidAlgorithmParameterException, BadPaddingException, IllegalBlockSizeException {
		
	    String cipherText = "TmD/I7qMnzJFNa/eTT2CdiNao6TPtznoVh4P+Kgp07oqY7yzXPfgRx7ApKAGwl5VSANvo+5E71Gki13hwgRKAcDBCnhtz1w7ShRVt7WtF5PXBVOx6NPZvuwVrZAZF7lQWwIJCk9jYEgxaZLRFEdBC/km//jmlmwkrsV7i+SHnqNhvY+A8BUlx+/fvae+wNCHWkf1YbbG/TXwj9rRiZhklm0Wuw0UgknleFo4tcCNxrm0o14Wspw+tSfGwR8OXzRKfU3eF+YuBP+p+eYI5FYT2oj8B5g0PUwBp3PinBdUFp9zxJ7s5+GeYDUXxf/u98uecIln5VIYXkJt3HWZwz6l6oRsXf54KQYPvMYMoKH88FzxWEnGs6eDWSCLDbs89Rk9tt/mwnihmzjFUqkPDSJ2rQ==";
	    SecretKey key = getKeyFromPassword("f4f35fe3ed13641d07cf7f21913b4682");
	    IvParameterSpec ivParameterSpec = generateIv();
	    String algorithm = "AES/CBC/PKCS5Padding";
	   
	    String plainText = decrypt(algorithm, cipherText, key, ivParameterSpec);	   
	    System.out.println("Ciphertext : " + cipherText + "\nPlain Text :" + plainText.substring(16,plainText.length()));
		
	}
	
	public static IvParameterSpec generateIv() {
	    byte[] iv = new byte[16];
	    new SecureRandom().nextBytes(iv);
	    return new IvParameterSpec(iv);
	}
	
	public static SecretKey getKeyFromPassword(String password)
		    throws NoSuchAlgorithmException, InvalidKeySpecException {
		   
		    SecretKey secret1 = new SecretKeySpec("samplekey".getBytes(), "AES");		   
		    return secret1;
		}
	
	public static String decrypt(String algorithm, String cipherText, SecretKey key,
		    IvParameterSpec iv) throws NoSuchPaddingException, NoSuchAlgorithmException,
		    InvalidAlgorithmParameterException, InvalidKeyException,
		    BadPaddingException, IllegalBlockSizeException {
		
		Cipher cipher = Cipher.getInstance(algorithm);
		cipher.init(Cipher.DECRYPT_MODE, key, iv);
		byte[] plainText = cipher.doFinal(Base64.getDecoder().decode(cipherText));
		return new String(plainText);
	}
}
