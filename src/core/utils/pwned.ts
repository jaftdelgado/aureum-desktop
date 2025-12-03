export const checkPasswordLeaked = async (password: string): Promise<boolean> => {
  if (!password) return false;

  try {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();

    const prefix = hashHex.slice(0, 5);
    const suffix = hashHex.slice(5);

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    if (!response.ok) return false;

    const text = await response.text();
    
    const leaked = text.split("\n").some((line) => {
      const [lineSuffix] = line.split(":");
      return lineSuffix.trim() === suffix;
    });

    return leaked;
  } catch (error) {
    console.error("Error verificando pwned password:", error);
    return false;
  }
};