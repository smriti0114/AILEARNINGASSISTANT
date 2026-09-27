from PIL import Image

img = Image.open('frontend/ai-learning-assistant/public/logo.png').convert('RGBA')
pixels = img.load()
width, height = img.size

# Check the four corners
corners = [
    pixels[0, 0],
    pixels[width-1, 0],
    pixels[0, height-1],
    pixels[width-1, height-1]
]
print("Corner pixels:", corners)
print("Image size:", width, height)
