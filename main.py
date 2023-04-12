import eel
import os

# Set web files folder and optionally specify which file types to check for
eel.init(f'{os.path.dirname(os.path.realpath(__file__))}/src')

# Define a function that will be called when the button is clicked
@eel.expose
def button_click():
    # Get the value of the input field
    text = eel.get_text()()
    # Print the value to the console
    print("Input value:", text)


host_ip="127.0.0.1"
host_port=8080
# Start the Eel app
eel.start("index.html",host=host_ip,port=host_port,mode='default')