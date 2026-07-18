src = "/Users/pankajsingh/.gemini/antigravity-ide/brain/acec0a73-8d14-4b30-a271-d4e5c02f8708/media__1784311494683.png"
dst = "/Users/pankajsingh/Desktop/lepxl ecom/public/aumtea_mockup.png"
try:
    with open(src, "rb") as fsrc:
        content = fsrc.read()
    with open(dst, "wb") as fdst:
        fdst.write(content)
    print("Success")
except Exception as e:
    print(f"Error: {e}")
