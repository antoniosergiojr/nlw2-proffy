export default function converthourToMinutes(time: string) {
    // 08:00
    const [hour, minutes] = time.split(':').map(Number);
    const timeinMinutes = (hour * 60) + minutes;
    
    return timeinMinutes;
}