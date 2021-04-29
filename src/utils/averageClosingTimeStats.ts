import { ItemsStatsRepo } from '../types/apiTypes';
import { AvergeTimes, AvergeTimesGroupByMonth, AverageTimeForMonth, AverageClosingTimeData } from '../types/appTypes';

function getAverageClosingTimeData(itemsStatsRepo: ItemsStatsRepo[]) {
    if (itemsStatsRepo.length === 0)
        return {
            '2021': [{ month: '0', averageTimeInHours: 0 }]
        };

    const itemsTimes: AvergeTimes[] = itemsStatsRepo.map(item => {
        return {
            createdAt: item.createdAt,
            closedAt: item.closedAt
        };
    });

    return getAverageClosingTimeStats(itemsTimes);
}

function getAverageClosingTimeStats(items: AvergeTimes[]) {
    const filteredItems = items.filter(item => item.createdAt && item.closedAt);
    const itemsWithTimeClosing = addTimeClosing(filteredItems);
    const itemsGroupByMonth = groupByMonth(itemsWithTimeClosing);
    const averageTimeForMonth = getAverageTimeForMonthInHours(itemsGroupByMonth);
    const averageTimeGroupYear = getAverageTimeGroupYear(averageTimeForMonth);

    return averageTimeGroupYear;
}

function addTimeClosing(items: AvergeTimes[]) {
    items.forEach(item => {
        const timeCreated = new Date(item.createdAt).getTime();
        const timeClosed = new Date(item.closedAt).getTime();

        item.timeClosing = timeClosed - timeCreated;
    });

    return items;
}

function groupByMonth(items: AvergeTimes[]) {
    const itemsGroupByMonth: AvergeTimesGroupByMonth = {};

    for (const item of items) {
        const yearAndMonth: string = item.createdAt.slice(0, 7);

        if (itemsGroupByMonth[yearAndMonth]) {
            itemsGroupByMonth[yearAndMonth].push(item);
        } else {
            itemsGroupByMonth[yearAndMonth] = [item];
        }
    }

    return itemsGroupByMonth;
}

function getAverageTimeForMonthInHours(itemsGroupByMonth: AvergeTimesGroupByMonth) {
    const months = Object.keys(itemsGroupByMonth);
    const averageTimeForMonth: AverageTimeForMonth = {};
    const milisecondInHours = 3600000;

    for (const month of months) {
        const allTimeForMonth = itemsGroupByMonth[month].reduce((sum: number, item: AvergeTimes) => {
            item.timeClosing = item.timeClosing || 0;
            return sum + item.timeClosing;
        }, 0);

        const averageTime = allTimeForMonth / itemsGroupByMonth[month].length;
        const averageTimeInHours = Math.round(averageTime / milisecondInHours);
        averageTimeForMonth[month] = averageTimeInHours;
    }

    return averageTimeForMonth;
}

function getAverageTimeGroupYear(averageTimeForMonth: AverageTimeForMonth) {
    const averageTimeGroupYear: AverageClosingTimeData = {};
    const yearsAndMonths = Object.keys(averageTimeForMonth);

    for (const yearAndMonth of yearsAndMonths) {
        const year = yearAndMonth.slice(0, 4);
        const month = yearAndMonth.slice(5, 7);

        const averageTime = {
            month: month,
            averageTimeInHours: averageTimeForMonth[yearAndMonth]
        };

        if (averageTimeGroupYear[year]) {
            averageTimeGroupYear[year].push(averageTime);
        } else {
            averageTimeGroupYear[year] = [averageTime];
        }
    }

    return averageTimeGroupYear;
}

export { getAverageClosingTimeData };
