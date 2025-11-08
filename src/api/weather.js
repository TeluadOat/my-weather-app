export async function fetchWeatherData(city, apiKey) {
    try {
        // const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);
        if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            const errorMessage = body.message || body.statusText || "Unknown error";
            throw new Error(`API Error: ${errorMessage}`);
        }
        return await res.json();

    } catch (error) {
        throw error;
    }
}