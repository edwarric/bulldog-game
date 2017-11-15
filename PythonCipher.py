def breakCipher(cipherText):
    """This function will use frequency analysis since english language statistics
    should be accurate for very large inputs"""
     
    cipherAlphabet = {'A': 'A'}
    cipherTextFrequencies = [0] * 26
    
    
    "initialise alphabet dictionary"
    for i in range(1, 26):
        cipherAlphabet[chr(65+i)] = chr(65+i)
        
    "count how many times each letter occurs in the string"
    for c in cipherText:
        letterIndex = ord(c) - 65
        cipherTextFrequencies[letterIndex] +=1

    print(cipherTextFrequencies)

    for j in range(0, 26):
        currentHighest = -1
        highestIndex = -1
        for i in range(0, 26):
            if cipherTextFrequencies[i] > currentHighest:
                currentHighest = cipherTextFrequencies[i]
                highestIndex = i
  
        cipherTextFrequencies[highestIndex] = 0
        if j == 0:
            cipherAlphabet[chr(65+highestIndex)] = 'E'
        elif j ==1:
            cipherAlphabet[chr(65+highestIndex)] = 'T'
        elif j == 2:
            cipherAlphabet[chr(65+highestIndex)] = 'A'
        elif j == 3:
            cipherAlphabet[chr(65+highestIndex)] = 'O'
        elif j == 4:
            cipherAlphabet[chr(65+highestIndex)] = 'I'
        elif j == 5:
            cipherAlphabet[chr(65+highestIndex)] = 'N'
        elif j == 6:
            cipherAlphabet[chr(65+highestIndex)] = 'S'
        elif j == 7:
            cipherAlphabet[chr(65+highestIndex)] = 'R'
        elif j == 8:
            cipherAlphabet[chr(65+highestIndex)] = 'H'
        elif j == 9:
            cipherAlphabet[chr(65+highestIndex)] = 'D'
        elif j == 10:
            cipherAlphabet[chr(65+highestIndex)] = 'L'
        elif j == 11:
            cipherAlphabet[chr(65+highestIndex)] = 'U'
        elif j == 12:
            cipherAlphabet[chr(65+highestIndex)] = 'C'
        elif j == 13:
            cipherAlphabet[chr(65+highestIndex)] = 'M'
        elif j == 14:
            cipherAlphabet[chr(65+highestIndex)] = 'F'
        elif j == 15:
            cipherAlphabet[chr(65+highestIndex)] = 'Y'
        elif j == 16:
            cipherAlphabet[chr(65+highestIndex)] = 'W'
        elif j == 17:
            cipherAlphabet[chr(65+highestIndex)] = 'G'
        elif j == 18:
            cipherAlphabet[chr(65+highestIndex)] = 'P'
        elif j == 19:
            cipherAlphabet[chr(65+highestIndex)] = 'B'
        elif j == 20:
            cipherAlphabet[chr(65+highestIndex)] = 'V'
        elif j == 21:
            cipherAlphabet[chr(65+highestIndex)] = 'K'
        elif j == 22:
            cipherAlphabet[chr(65+highestIndex)] = 'X'
        elif j == 23:
            cipherAlphabet[chr(65+highestIndex)] = 'Q'
        elif j == 24:
            cipherAlphabet[chr(65+highestIndex)] = 'J'
        elif j == 25:
            cipherAlphabet[chr(65+highestIndex)] = 'Z'
    plainText = ""
    for c in cipherText:
        plainText += cipherAlphabet[c]
    return plainText
