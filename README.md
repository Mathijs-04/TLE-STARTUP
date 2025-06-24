# De Blije Bij! 🐝🌼

## How to run locally:

1. Clone the repository  
```bash
git clone https://github.com/Mathijs-04/TLE-STARTUP.git
```

2. Install dependencies  
```bash
npm install
```

3. Start the Expo development server  
```bash
npx expo start
```

4. Scan the QR-code with the Expo Go app on your phone, or run the app in an emulator.

## App features

**Build your garden**  
Create a digital version of your own garden by placing tiles, paths, plants, and objects.

**Get greening advice**  
Based on your layout, the app gives advice on how to make your garden greener and more eco-friendly.

**Plant suggestions**  
Receive plant recommendations suited for your garden layout, light conditions, and preferred pollinators.  
Also includes eco tips for a more sustainable garden.  


**Detailed plant information**  
View more info about a specific plant by tapping on it.  


**Eco tips** 
Get useful sustainability tips to reduce water usage, boost biodiversity, and support pollinators in your garden.




## Notes

- Make sure the Plant Data API (https://github.com/SEVerhaak/TLE-2.2-Plant-Data-API) is running locally on port 3000. Follow the instructions from the README.md.
- You can configure the API base URL in a `.env` file at the root of the project:  
```env
API_URL=http://127.0.0.1:3000
```
