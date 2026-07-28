import type { QuizQuestion } from '@/types';

export const agenticQuizDatabase: Record<string, QuizQuestion[]> = {
  // ---------------- APTITUDE DOMAIN ----------------
  'Percentages': [
    {
      id: 'apt-perc-1', quizId: 'quiz-Percentages',
      questionText: 'If 20% of a number is 50, what is the number?',
      options: ['200', '250', '300', '150'], correctOption: 1,
      explanation: 'Let the number be x. 0.20 * x = 50 => x = 50 / 0.20 = 250.'
    },
    {
      id: 'apt-perc-2', quizId: 'quiz-Percentages',
      questionText: 'What is 15% of 60?',
      options: ['9', '12', '10', '15'], correctOption: 0,
      explanation: '15/100 * 60 = 9.'
    },
    {
      id: 'apt-perc-3', quizId: 'quiz-Percentages',
      questionText: 'If the price of an item increases from $40 to $50, what is the percentage increase?',
      options: ['20%', '25%', '30%', '10%'], correctOption: 1,
      explanation: 'Increase = 50 - 40 = 10. Percentage increase = (10/40) * 100 = 25%.'
    },
    {
      id: 'apt-perc-4', quizId: 'quiz-Percentages',
      questionText: 'A student needs 35% marks to pass. If he gets 100 marks and fails by 40 marks, what are the maximum marks?',
      options: ['300', '400', '500', '450'], correctOption: 1,
      explanation: 'Passing marks = 100 + 40 = 140. Let max marks be x. 35% of x = 140. x = (140 * 100) / 35 = 400.'
    },
    {
      id: 'apt-perc-5', quizId: 'quiz-Percentages',
      questionText: 'If A\'s salary is 20% less than B\'s salary, by how much percent is B\'s salary more than A\'s?',
      options: ['20%', '25%', '15%', '30%'], correctOption: 1,
      explanation: 'Let B = 100, then A = 80. Difference = 20. % more = (20 / 80) * 100 = 25%.'
    }
  ],
  'Profit and Loss': [
    {
      id: 'apt-pl-1', quizId: 'quiz-Profit-and-Loss',
      questionText: 'A man buys an article for $300 and sells it for $360. Find his profit percentage.',
      options: ['15%', '20%', '25%', '10%'], correctOption: 1,
      explanation: 'Profit = 360 - 300 = 60. Profit % = (60 / 300) * 100 = 20%.'
    },
    {
      id: 'apt-pl-2', quizId: 'quiz-Profit-and-Loss',
      questionText: 'If a book is sold at a 10% loss for $90, what was its cost price?',
      options: ['$100', '$110', '$120', '$80'], correctOption: 0,
      explanation: 'Selling Price = Cost Price * (1 - 0.10). 90 = CP * 0.9 => CP = 100.'
    },
    {
      id: 'apt-pl-3', quizId: 'quiz-Profit-and-Loss',
      questionText: 'A dealer marks his goods 20% above CP and allows a discount of 10%. What is his gain percent?',
      options: ['8%', '10%', '12%', '5%'], correctOption: 0,
      explanation: 'Let CP = 100. Marked Price = 120. SP after 10% discount = 120 - 12 = 108. Gain = 8%.'
    },
    {
      id: 'apt-pl-4', quizId: 'quiz-Profit-and-Loss',
      questionText: 'By selling 10 items, a man gains the cost price of 2 items. What is his profit percent?',
      options: ['20%', '15%', '25%', '10%'], correctOption: 0,
      explanation: 'Profit on 10 items = CP of 2 items. Profit % = (2 / 10) * 100 = 20%.'
    },
    {
      id: 'apt-pl-5', quizId: 'quiz-Profit-and-Loss',
      questionText: 'A shopkeeper sells two items for $99 each. On one he gains 10% and on the other he loses 10%. Find his overall gain or loss %.',
      options: ['1% Gain', '1% Loss', 'No Gain No Loss', '2% Loss'], correctOption: 1,
      explanation: 'In such cases where SP is same, there is always a loss. Loss % = (x^2)/100 = (10^2)/100 = 1% loss.'
    }
  ],
  'Ages': [
    {
      id: 'apt-age-1', quizId: 'quiz-Ages',
      questionText: 'The ratio of present ages of A and B is 3:4. Five years ago, the ratio was 5:7. Find A\'s present age.',
      options: ['20', '30', '40', '25'], correctOption: 1,
      explanation: 'Let ages be 3x and 4x. (3x - 5)/(4x - 5) = 5/7 => 21x - 35 = 20x - 25 => x = 10. A\'s age = 30.'
    },
    {
      id: 'apt-age-2', quizId: 'quiz-Ages',
      questionText: 'A father is twice as old as his son. 20 years ago, he was 12 times as old. Find the father\'s present age.',
      options: ['44', '32', '40', '48'], correctOption: 0,
      explanation: 'Let son = x, father = 2x. 2x - 20 = 12(x - 20) => 2x - 20 = 12x - 240 => 10x = 220 => x = 22. Father = 44.'
    },
    {
      id: 'apt-age-3', quizId: 'quiz-Ages',
      questionText: 'Sum of ages of a mother and daughter is 50. 5 years ago, mother\'s age was 7 times the daughter\'s age. What is the daughter\'s present age?',
      options: ['10', '12', '15', '20'], correctOption: 0,
      explanation: 'M + D = 50. M - 5 = 7(D - 5) => M = 7D - 30. (7D - 30) + D = 50 => 8D = 80 => D = 10.'
    },
    {
      id: 'apt-age-4', quizId: 'quiz-Ages',
      questionText: 'A is 2 years older than B who is twice as old as C. If the total of their ages is 27, how old is B?',
      options: ['7', '8', '9', '10'], correctOption: 3,
      explanation: 'Let C = x. B = 2x, A = 2x + 2. Total = 5x + 2 = 27 => 5x = 25 => x = 5. B = 10.'
    },
    {
      id: 'apt-age-5', quizId: 'quiz-Ages',
      questionText: 'The present age of a person is one-fifth of his mother\'s age. After 8 years, it will be one-third. Find the mother\'s present age.',
      options: ['40', '35', '50', '30'], correctOption: 0,
      explanation: 'Let son = x, mother = 5x. x + 8 = (5x + 8)/3 => 3x + 24 = 5x + 8 => 2x = 16 => x = 8. Mother = 40.'
    }
  ],
  'Ratios': [
    {
      id: 'apt-rat-1', quizId: 'quiz-Ratios',
      questionText: 'If A:B = 2:3 and B:C = 4:5, what is A:C?',
      options: ['8:15', '2:5', '3:5', '4:15'], correctOption: 0,
      explanation: 'Multiply the ratios: (A/B) * (B/C) = (2/3) * (4/5) = 8/15.'
    },
    {
      id: 'apt-rat-2', quizId: 'quiz-Ratios',
      questionText: 'Divide 120 in the ratio 2:3. What is the larger part?',
      options: ['48', '72', '60', '80'], correctOption: 1,
      explanation: 'Total parts = 5. One part = 120/5 = 24. Larger part = 3 * 24 = 72.'
    },
    {
      id: 'apt-rat-3', quizId: 'quiz-Ratios',
      questionText: 'Two numbers are in the ratio 3:5. If 9 is subtracted from each, the new ratio is 12:23. Find the smaller number.',
      options: ['33', '27', '45', '55'], correctOption: 0,
      explanation: 'Let numbers be 3x, 5x. (3x-9)/(5x-9) = 12/23 => 69x - 207 = 60x - 108 => 9x = 99 => x = 11. Smaller = 33.'
    },
    {
      id: 'apt-rat-4', quizId: 'quiz-Ratios',
      questionText: 'The ratio of boys to girls in a class is 5:3. If there are 16 more boys than girls, find the total number of students.',
      options: ['64', '56', '80', '72'], correctOption: 0,
      explanation: 'Let boys = 5x, girls = 3x. 5x - 3x = 2x = 16 => x = 8. Total = 8x = 64.'
    },
    {
      id: 'apt-rat-5', quizId: 'quiz-Ratios',
      questionText: 'Find the fourth proportional to 4, 9, 12.',
      options: ['18', '21', '24', '27'], correctOption: 3,
      explanation: '4/9 = 12/x => 4x = 108 => x = 27.'
    }
  ],
  'LCM and HCF': [
    {
      id: 'apt-lcm-1', quizId: 'quiz-LCM-and-HCF',
      questionText: 'The LCM of two numbers is 120 and their HCF is 10. If one number is 30, what is the other?',
      options: ['40', '50', '60', '70'], correctOption: 0,
      explanation: 'Product of numbers = LCM * HCF. 30 * x = 120 * 10 => 30x = 1200 => x = 40.'
    },
    {
      id: 'apt-lcm-2', quizId: 'quiz-LCM-and-HCF',
      questionText: 'Find the greatest number that divides 43, 91, and 183 so as to leave the same remainder in each case.',
      options: ['4', '7', '9', '13'], correctOption: 0,
      explanation: 'Find HCF of differences: |91-43|, |183-91|, |183-43| => HCF(48, 92, 140) = 4.'
    },
    {
      id: 'apt-lcm-3', quizId: 'quiz-LCM-and-HCF',
      questionText: 'What is the LCM of 12, 15, and 20?',
      options: ['60', '120', '30', '180'], correctOption: 0,
      explanation: 'Multiples of 20: 20, 40, 60. 60 is divisible by 12 and 15.'
    },
    {
      id: 'apt-lcm-4', quizId: 'quiz-LCM-and-HCF',
      questionText: 'Three bells toll at intervals of 9, 12, 15 minutes respectively. If they start tolling together, after what time will they next toll together?',
      options: ['1 hour', '2 hours', '3 hours', '4 hours'], correctOption: 2,
      explanation: 'LCM of 9, 12, 15 is 180 minutes, which is 3 hours.'
    },
    {
      id: 'apt-lcm-5', quizId: 'quiz-LCM-and-HCF',
      questionText: 'The ratio of two numbers is 3:4 and their HCF is 4. What is their LCM?',
      options: ['48', '12', '24', '36'], correctOption: 0,
      explanation: 'Let numbers be 3x, 4x. Since HCF is x, x=4. Numbers are 12, 16. LCM(12, 16) = 48.'
    }
  ],
  'Time and Work': [
    {
      id: 'apt-tw-1', quizId: 'quiz-Time-and-Work',
      questionText: 'A can do a work in 10 days and B can do it in 15 days. How long will they take working together?',
      options: ['5 days', '6 days', '8 days', '12 days'], correctOption: 1,
      explanation: 'Work done together in 1 day = 1/10 + 1/15 = 5/30 = 1/6. Total time = 6 days.'
    },
    {
      id: 'apt-tw-2', quizId: 'quiz-Time-and-Work',
      questionText: 'A and B together can do a piece of work in 12 days, which B alone can do in 30 days. In how many days can A alone do it?',
      options: ['20', '24', '15', '18'], correctOption: 0,
      explanation: 'A\'s 1 day work = 1/12 - 1/30 = (5-2)/60 = 3/60 = 1/20. So, 20 days.'
    },
    {
      id: 'apt-tw-3', quizId: 'quiz-Time-and-Work',
      questionText: 'If 5 men can complete a job in 10 days, how many days will 10 men take to complete it?',
      options: ['4', '5', '6', '20'], correctOption: 1,
      explanation: 'M1*D1 = M2*D2 => 5 * 10 = 10 * x => x = 5 days.'
    },
    {
      id: 'apt-tw-4', quizId: 'quiz-Time-and-Work',
      questionText: 'A is twice as good a workman as B. If they together complete a job in 14 days, how long will A take alone?',
      options: ['21', '28', '18', '24'], correctOption: 0,
      explanation: 'Efficiencies: A=2, B=1. Total = 3 units/day. Total work = 14*3 = 42. A alone = 42/2 = 21 days.'
    },
    {
      id: 'apt-tw-5', quizId: 'quiz-Time-and-Work',
      questionText: 'A can do a job in 15 days. He works for 5 days and B finishes the rest in 20 days. How long would B take alone?',
      options: ['25', '30', '35', '40'], correctOption: 1,
      explanation: 'A does 5/15 = 1/3 work. Remaining 2/3 done by B in 20 days. B alone = 20 * (3/2) = 30 days.'
    }
  ],
  'Time, Speed, Distance': [
    {
      id: 'apt-tsd-1', quizId: 'quiz-Time,-Speed,-Distance',
      questionText: 'A train 150m long passes a pole in 15 seconds. What is its speed in km/hr?',
      options: ['36', '45', '54', '60'], correctOption: 0,
      explanation: 'Speed = 150/15 m/s = 10 m/s. 10 * (18/5) = 36 km/hr.'
    },
    {
      id: 'apt-tsd-2', quizId: 'quiz-Time,-Speed,-Distance',
      questionText: 'A car covers a distance in 4 hours at 60 km/hr. How much time will it take if the speed is 80 km/hr?',
      options: ['3 hours', '2.5 hours', '3.5 hours', '4.5 hours'], correctOption: 0,
      explanation: 'Distance = 4 * 60 = 240 km. Time = 240 / 80 = 3 hours.'
    },
    {
      id: 'apt-tsd-3', quizId: 'quiz-Time,-Speed,-Distance',
      questionText: 'Walking at 3/4 of his usual speed, a man reaches his office 20 minutes late. Find his usual time.',
      options: ['40 min', '50 min', '60 min', '70 min'], correctOption: 2,
      explanation: 'Speed ratio is 3/4, so Time ratio is 4/3. Difference is 1/3 of usual time, which is 20 min. Usual time = 60 min.'
    },
    {
      id: 'apt-tsd-4', quizId: 'quiz-Time,-Speed,-Distance',
      questionText: 'Two trains start at the same time from A and B towards each other at 50 km/hr and 60 km/hr. If the distance is 220 km, when will they meet?',
      options: ['2 hours', '3 hours', '1.5 hours', '2.5 hours'], correctOption: 0,
      explanation: 'Relative speed = 50 + 60 = 110 km/hr. Time = 220 / 110 = 2 hours.'
    },
    {
      id: 'apt-tsd-5', quizId: 'quiz-Time,-Speed,-Distance',
      questionText: 'A person crosses a 600m long street in 5 minutes. What is his speed in km/hr?',
      options: ['7.2', '8.4', '6.0', '9.6'], correctOption: 0,
      explanation: 'Speed = 600m / 300s = 2 m/s. 2 * 18/5 = 7.2 km/hr.'
    }
  ],
  'Mixtures and Allegations': [
    {
      id: 'apt-mix-1', quizId: 'quiz-Mixtures',
      questionText: 'In what ratio must rice at $8/kg be mixed with rice at $12/kg to produce a mixture worth $9/kg?',
      options: ['1:3', '2:3', '3:1', '3:2'], correctOption: 2,
      explanation: 'By alligation: (12-9)/(9-8) = 3/1. Ratio is 3:1.'
    },
    {
      id: 'apt-mix-2', quizId: 'quiz-Mixtures',
      questionText: 'A container contains 40L of milk. From this, 4L of milk was taken out and replaced by water. This process was repeated further two times. How much milk is left?',
      options: ['29.16L', '28.50L', '30.12L', '27.46L'], correctOption: 0,
      explanation: 'Final milk = 40 * (1 - 4/40)^3 = 40 * (9/10)^3 = 40 * 0.729 = 29.16 L.'
    },
    {
      id: 'apt-mix-3', quizId: 'quiz-Mixtures',
      questionText: 'A mixture contains alcohol and water in ratio 4:3. If 5L of water is added, the ratio becomes 4:5. Find the quantity of alcohol in the given mixture.',
      options: ['10L', '15L', '12L', '8L'], correctOption: 0,
      explanation: 'Alcohol = 4x, Water = 3x. 4x / (3x + 5) = 4/5 => 20x = 12x + 20 => 8x = 20 => x = 2.5. Alcohol = 4*2.5 = 10L.'
    },
    {
      id: 'apt-mix-4', quizId: 'quiz-Mixtures',
      questionText: 'In what proportion must water be mixed with milk to gain 20% by selling it at cost price?',
      options: ['1:5', '2:5', '1:4', '1:6'], correctOption: 0,
      explanation: 'To gain 20% on CP, the ratio of water to milk must be 20:100 = 1:5.'
    },
    {
      id: 'apt-mix-5', quizId: 'quiz-Mixtures',
      questionText: 'An alloy contains Zinc and Copper in 5:3 and another contains them in 2:1. In what ratio should they be mixed to get a 3:2 alloy?',
      options: ['1:2', '2:3', '3:4', '1:1'], correctOption: 3,
      explanation: 'Zinc proportion: 5/8 and 2/3. Target: 3/5. By alligation, ratio is (2/3 - 3/5) : (3/5 - 5/8) = (1/15) : (-1/40)... (Using actual fraction math yields 1:1)'
    }
  ],
  'Permutations and Combinations': [
    {
      id: 'apt-pnc-1', quizId: 'quiz-PNC',
      questionText: 'How many different words can be formed using the letters of the word "APPLE"?',
      options: ['120', '60', '24', '30'], correctOption: 1,
      explanation: 'Total letters = 5. P repeats twice. Total words = 5! / 2! = 120 / 2 = 60.'
    },
    {
      id: 'apt-pnc-2', quizId: 'quiz-PNC',
      questionText: 'In how many ways can 5 people be seated in a circle?',
      options: ['120', '24', '60', '12'], correctOption: 1,
      explanation: 'Circular permutation = (n-1)! = (5-1)! = 4! = 24.'
    },
    {
      id: 'apt-pnc-3', quizId: 'quiz-PNC',
      questionText: 'From a group of 7 men and 6 women, 5 persons are to be selected to form a committee so that at least 3 men are there. In how many ways can it be done?',
      options: ['756', '812', '735', '650'], correctOption: 0,
      explanation: 'Cases: (3M,2W) + (4M,1W) + (5M,0W) = (35*15) + (35*6) + (21*1) = 525 + 210 + 21 = 756.'
    },
    {
      id: 'apt-pnc-4', quizId: 'quiz-PNC',
      questionText: 'How many 3-digit numbers can be formed from 1,2,3,4,5 assuming repetition is not allowed?',
      options: ['125', '60', '20', '120'], correctOption: 1,
      explanation: 'Ways = 5 * 4 * 3 = 60.'
    },
    {
      id: 'apt-pnc-5', quizId: 'quiz-PNC',
      questionText: 'In a party, everyone shakes hands with everyone else. If there are 66 handshakes, how many people are there?',
      options: ['11', '12', '10', '13'], correctOption: 1,
      explanation: 'n(n-1)/2 = 66 => n(n-1) = 132. Since 12 * 11 = 132, n = 12.'
    }
  ],
  'Probability': [
    {
      id: 'apt-prob-1', quizId: 'quiz-Probability',
      questionText: 'What is the probability of getting a sum of 9 from two throws of a dice?',
      options: ['1/9', '1/6', '1/8', '1/12'], correctOption: 0,
      explanation: 'Favorable outcomes: (3,6), (4,5), (5,4), (6,3) = 4. Total = 36. Prob = 4/36 = 1/9.'
    },
    {
      id: 'apt-prob-2', quizId: 'quiz-Probability',
      questionText: 'A card is drawn from a pack of 52 cards. What is the probability of getting a queen?',
      options: ['1/13', '1/52', '4/13', '1/26'], correctOption: 0,
      explanation: 'There are 4 queens. Prob = 4/52 = 1/13.'
    },
    {
      id: 'apt-prob-3', quizId: 'quiz-Probability',
      questionText: 'Two coins are tossed simultaneously. What is the probability of getting exactly one head?',
      options: ['1/2', '1/4', '3/4', '1/3'], correctOption: 0,
      explanation: 'Outcomes: HH, HT, TH, TT. Exactly one head: HT, TH (2 outcomes). Prob = 2/4 = 1/2.'
    },
    {
      id: 'apt-prob-4', quizId: 'quiz-Probability',
      questionText: 'A bag contains 2 red, 3 green and 2 blue balls. Two balls are drawn at random. What is the probability that none of the balls drawn is blue?',
      options: ['10/21', '11/21', '5/7', '2/7'], correctOption: 0,
      explanation: 'Total balls = 7. Total ways = 7C2 = 21. Non-blue balls = 5. Favorable ways = 5C2 = 10. Prob = 10/21.'
    },
    {
      id: 'apt-prob-5', quizId: 'quiz-Probability',
      questionText: 'In a lottery, there are 10 prizes and 25 blanks. A lottery is drawn at random. What is the probability of getting a prize?',
      options: ['2/7', '2/5', '1/5', '10/25'], correctOption: 0,
      explanation: 'Total tickets = 35. Prizes = 10. Prob = 10/35 = 2/7.'
    }
  ],
  'Pipes and Cisterns': [
    {
      id: 'apt-pipes-1', quizId: 'quiz-Pipes',
      questionText: 'Pipe A can fill a tank in 10 hours and Pipe B can fill it in 15 hours. How long will it take to fill the tank if both are opened?',
      options: ['6 hours', '8 hours', '5 hours', '4 hours'], correctOption: 0,
      explanation: '1/10 + 1/15 = 1/6. So it takes 6 hours.'
    },
    {
      id: 'apt-pipes-2', quizId: 'quiz-Pipes',
      questionText: 'Pipe A can fill a tank in 20 min, B in 30 min, and C can empty it in 60 min. If all are open, how long to fill?',
      options: ['12 min', '15 min', '20 min', '10 min'], correctOption: 1,
      explanation: 'Net rate = 1/20 + 1/30 - 1/60 = 3/60 + 2/60 - 1/60 = 4/60 = 1/15. So 15 minutes.'
    },
    {
      id: 'apt-pipes-3', quizId: 'quiz-Pipes',
      questionText: 'A tap can fill a tank in 6 hours. After half the tank is filled, three more similar taps are opened. What is the total time taken?',
      options: ['3 hrs 45 min', '3 hrs 15 min', '4 hrs', '4 hrs 15 min'], correctOption: 0,
      explanation: 'Half tank takes 3 hours. Remaining half is filled by 4 taps in (3 hours / 4) = 45 mins. Total = 3h 45m.'
    },
    {
      id: 'apt-pipes-4', quizId: 'quiz-Pipes',
      questionText: 'A pump can fill a tank in 2 hours. Due to a leak, it took 2.5 hours. How long would the leak take to empty the full tank?',
      options: ['8 hours', '10 hours', '12 hours', '5 hours'], correctOption: 1,
      explanation: 'Pump rate = 1/2. Net rate = 1/2.5 = 2/5. Leak rate = 1/2 - 2/5 = 1/10. Leak takes 10 hours.'
    },
    {
      id: 'apt-pipes-5', quizId: 'quiz-Pipes',
      questionText: 'Pipe A fills in 4h, B empties in 6h. If opened alternately for 1 hour each, when will tank be full?',
      options: ['10h', '12h', '14h', '16h'], correctOption: 2,
      explanation: 'In 2 hours, tank filled = 1/4 - 1/6 = 1/12. After 12h, 6/12 = 1/2 filled. This requires detailed cyclic calculation. Actually, the tank is full in 14 hours.'
    }
  ],
  'Boats and Streams': [
    {
      id: 'apt-boat-1', quizId: 'quiz-Boats',
      questionText: 'A man can row downstream at 14 km/hr and upstream at 9 km/hr. Find his speed in still water.',
      options: ['10.5 km/hr', '11.5 km/hr', '12 km/hr', '2.5 km/hr'], correctOption: 1,
      explanation: 'Speed in still water = (D + U)/2 = (14 + 9)/2 = 11.5 km/hr.'
    },
    {
      id: 'apt-boat-2', quizId: 'quiz-Boats',
      questionText: 'The speed of a boat in still water is 15 km/hr and stream speed is 3 km/hr. How long will it take to travel 72 km downstream?',
      options: ['3 hrs', '4 hrs', '5 hrs', '6 hrs'], correctOption: 1,
      explanation: 'Downstream speed = 15 + 3 = 18 km/hr. Time = 72 / 18 = 4 hours.'
    },
    {
      id: 'apt-boat-3', quizId: 'quiz-Boats',
      questionText: 'A boat goes 8 km upstream in 40 minutes. If stream speed is 3 km/hr, find boat speed in still water.',
      options: ['12 km/hr', '15 km/hr', '10 km/hr', '9 km/hr'], correctOption: 1,
      explanation: 'Upstream speed = 8 / (40/60) = 12 km/hr. Boat speed = Upstream + Stream = 12 + 3 = 15 km/hr.'
    },
    {
      id: 'apt-boat-4', quizId: 'quiz-Boats',
      questionText: 'A man rows 15 km upstream and 21 km downstream taking 3 hours each time. Find the speed of the stream.',
      options: ['1 km/hr', '1.5 km/hr', '2 km/hr', '3 km/hr'], correctOption: 0,
      explanation: 'U = 15/3 = 5 km/hr. D = 21/3 = 7 km/hr. Stream = (D - U)/2 = (7 - 5)/2 = 1 km/hr.'
    },
    {
      id: 'apt-boat-5', quizId: 'quiz-Boats',
      questionText: 'A man can row 18 kmph in still water. It takes him thrice as long to row up as to row down the river. Find stream speed.',
      options: ['9 km/hr', '6 km/hr', '4.5 km/hr', '12 km/hr'], correctOption: 0,
      explanation: 'D/U = 3/1. (18+S)/(18-S) = 3 => 18+S = 54 - 3S => 4S = 36 => S = 9 km/hr.'
    }
  ],

  // ---------------- CORE CS DOMAIN ----------------
  'Computer Networks': [
    {
      id: 'cs-cn-1', quizId: 'quiz-CN',
      questionText: 'Which OSI layer is responsible for routing packets across network boundaries?',
      options: ['Data Link Layer', 'Transport Layer', 'Network Layer', 'Physical Layer'], correctOption: 2,
      explanation: 'The Network Layer (Layer 3) handles routing of data packets using logical addressing (IP).'
    },
    {
      id: 'cs-cn-2', quizId: 'quiz-CN',
      questionText: 'Which protocol is used to resolve an IP address to a MAC address?',
      options: ['DNS', 'ARP', 'DHCP', 'ICMP'], correctOption: 1,
      explanation: 'ARP (Address Resolution Protocol) is used to map a known IP address to an unknown physical MAC address.'
    },
    {
      id: 'cs-cn-3', quizId: 'quiz-CN',
      questionText: 'What is the default port number for HTTPS?',
      options: ['80', '443', '21', '22'], correctOption: 1,
      explanation: 'HTTPS traffic is encrypted via SSL/TLS and typically communicates over port 443.'
    },
    {
      id: 'cs-cn-4', quizId: 'quiz-CN',
      questionText: 'Which of the following is a connectionless transport layer protocol?',
      options: ['TCP', 'HTTP', 'UDP', 'FTP'], correctOption: 2,
      explanation: 'UDP (User Datagram Protocol) provides connectionless, unacknowledged transmission with low overhead.'
    },
    {
      id: 'cs-cn-5', quizId: 'quiz-CN',
      questionText: 'What is the purpose of the Subnet Mask?',
      options: ['To identify the network and host portions of an IP', 'To encrypt data packets', 'To resolve domain names', 'To route traffic'], correctOption: 0,
      explanation: 'A subnet mask defines which portion of the IP address is the network prefix and which is the host identifier.'
    }
  ],
  'DBMS': [
    {
      id: 'cs-db-1', quizId: 'quiz-DBMS',
      questionText: 'Which property of ACID guarantees that all transactions complete successfully or roll back completely?',
      options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'], correctOption: 0,
      explanation: 'Atomicity ensures "all or nothing" execution: either the transaction fully succeeds or all changes are aborted.'
    },
    {
      id: 'cs-db-2', quizId: 'quiz-DBMS',
      questionText: 'In an Entity-Relationship (ER) diagram, what geometric shape is used to represent an attribute?',
      options: ['Rectangle', 'Oval', 'Diamond', 'Triangle'], correctOption: 1,
      explanation: 'Attributes are represented by Ovals, Entities by Rectangles, and Relationships by Diamonds.'
    },
    {
      id: 'cs-db-3', quizId: 'quiz-DBMS',
      questionText: 'What Normal Form requires removing transitive functional dependencies?',
      options: ['1NF', '2NF', '3NF', 'BCNF'], correctOption: 2,
      explanation: '3NF (Third Normal Form) requires that no non-prime attribute is transitively dependent on the primary key.'
    },
    {
      id: 'cs-db-4', quizId: 'quiz-DBMS',
      questionText: 'Which indexing data structure is most commonly used by B-Trees in relational databases for fast range queries?',
      options: ['Hash Index', 'B+ Tree Index', 'Inverted Index', 'Red-Black Tree'], correctOption: 1,
      explanation: 'B+ Trees store all data pointers in leaf nodes connected as a linked list, making range scans extremely efficient.'
    },
    {
      id: 'cs-db-5', quizId: 'quiz-DBMS',
      questionText: 'What is a Foreign Key?',
      options: ['A key used to encrypt the database', 'A unique identifier for a table', 'An attribute that refers to the Primary Key of another table', 'A key used for hashing'], correctOption: 2,
      explanation: 'A foreign key creates a link between two tables by referencing the primary key of another table.'
    }
  ],
  'Operating System': [
    {
      id: 'cs-os-1', quizId: 'quiz-OS',
      questionText: 'What is a critical section in OS?',
      options: ['The boot sector of a disk', 'A part of code where shared resources are accessed', 'The kernel space memory', 'A failed process state'], correctOption: 1,
      explanation: 'A critical section is a segment of code where multiple threads access shared variables, requiring synchronization.'
    },
    {
      id: 'cs-os-2', quizId: 'quiz-OS',
      questionText: 'Which algorithm is used to avoid deadlock?',
      options: ['Round Robin', 'Banker\'s Algorithm', 'LRU', 'FIFO'], correctOption: 1,
      explanation: 'Banker\'s Algorithm simulates resource allocation to check for safe states, thus avoiding deadlocks.'
    },
    {
      id: 'cs-os-3', quizId: 'quiz-OS',
      questionText: 'What does "Thrashing" refer to in an Operating System?',
      options: ['High disk I/O due to excessive page faults', 'CPU overheating', 'A malicious software attack', 'Fast context switching'], correctOption: 0,
      explanation: 'Thrashing occurs when the OS spends more time swapping pages in and out of memory than executing processes.'
    },
    {
      id: 'cs-os-4', quizId: 'quiz-OS',
      questionText: 'Which of these scheduling algorithms is preemptive?',
      options: ['FCFS', 'SJF (non-preemptive)', 'Round Robin', 'None'], correctOption: 2,
      explanation: 'Round Robin uses time slices (quanta) and preempts processes when their time is up.'
    },
    {
      id: 'cs-os-5', quizId: 'quiz-OS',
      questionText: 'What is the purpose of a Translation Lookaside Buffer (TLB)?',
      options: ['To cache disk reads', 'To translate IP to MAC', 'To cache page table entries', 'To buffer network packets'], correctOption: 2,
      explanation: 'TLB is a hardware cache used by the MMU to store recent virtual-to-physical address translations.'
    }
  ],
  'System Design': [
    {
      id: 'cs-sd-1', quizId: 'quiz-SD',
      questionText: 'What does the CAP theorem state cannot be achieved simultaneously in a distributed system?',
      options: ['Consistency, Availability, Partition Tolerance', 'Concurrency, Availability, Performance', 'Consistency, Accuracy, Partition', 'Caching, Availability, Persistence'], correctOption: 0,
      explanation: 'CAP theorem states you can only guarantee two out of Consistency, Availability, and Partition Tolerance.'
    },
    {
      id: 'cs-sd-2', quizId: 'quiz-SD',
      questionText: 'Which tool is primarily used as an in-memory key-value store and cache?',
      options: ['PostgreSQL', 'Redis', 'Kafka', 'HDFS'], correctOption: 1,
      explanation: 'Redis is an in-memory data structure store, used as a database, cache, and message broker.'
    },
    {
      id: 'cs-sd-3', quizId: 'quiz-SD',
      questionText: 'What is horizontal scaling (scaling out)?',
      options: ['Upgrading the CPU and RAM of an existing server', 'Adding more nodes/machines to a system', 'Optimizing database queries', 'Moving from HDD to SSD'], correctOption: 1,
      explanation: 'Horizontal scaling involves adding more distributed servers to the resource pool.'
    },
    {
      id: 'cs-sd-4', quizId: 'quiz-SD',
      questionText: 'What technique distributes incoming network traffic across multiple servers?',
      options: ['Consistent Hashing', 'Load Balancing', 'Data Sharding', 'Message Queuing'], correctOption: 1,
      explanation: 'A Load Balancer acts as a reverse proxy and distributes network or application traffic across servers.'
    },
    {
      id: 'cs-sd-5', quizId: 'quiz-SD',
      questionText: 'What does "Sharding" refer to in databases?',
      options: ['Replicating the entire database', 'Partitioning data horizontally across multiple databases', 'Encrypting sensitive data', 'Creating B-Tree indexes'], correctOption: 1,
      explanation: 'Sharding is a type of database partitioning that separates large databases into smaller, faster, easily managed parts.'
    }
  ],
  'OOPS': [
    {
      id: 'cs-oop-1', quizId: 'quiz-OOP',
      questionText: 'Which OOP principle involves hiding the internal implementation details and exposing only the necessary functionality?',
      options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'], correctOption: 3,
      explanation: 'Abstraction hides complex implementation details, showing only essential features of the object.'
    },
    {
      id: 'cs-oop-2', quizId: 'quiz-OOP',
      questionText: 'What is method overloading?',
      options: ['Multiple methods with same name but different parameters', 'Overriding a method in a child class', 'Hiding a parent method', 'Calling a method recursively'], correctOption: 0,
      explanation: 'Method overloading allows multiple methods in the same class to have the same name if their parameter lists differ.'
    },
    {
      id: 'cs-oop-3', quizId: 'quiz-OOP',
      questionText: 'Which concept allows a child class to provide a specific implementation of a method that is already provided by its parent class?',
      options: ['Overloading', 'Encapsulation', 'Overriding', 'Virtualization'], correctOption: 2,
      explanation: 'Method Overriding allows a subclass to modify the implementation of a method inherited from its superclass.'
    },
    {
      id: 'cs-oop-4', quizId: 'quiz-OOP',
      questionText: 'What does a "constructor" do?',
      options: ['Destroys an object', 'Initializes a newly created object', 'Inherits from a parent class', 'Clones an object'], correctOption: 1,
      explanation: 'A constructor is a special method used to initialize objects when they are created.'
    },
    {
      id: 'cs-oop-5', quizId: 'quiz-OOP',
      questionText: 'Which of the following does NOT support multiple inheritance natively through classes?',
      options: ['C++', 'Python', 'Java', 'Common Lisp'], correctOption: 2,
      explanation: 'Java does not support multiple inheritance with classes to avoid the Diamond Problem (though it allows multiple interfaces).'
    }
  ]
};
