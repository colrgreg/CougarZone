const { useState, useEffect } = React;

// SVG Icon Components
const Search = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
    </svg>
);

const Calendar = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

const Clock = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const MapPin = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const ChevronLeft = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

const Check = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

// Basketball Games Data
const basketballGames = [
    {
        id: 1,
        homeTeam: "College of Charleston Cougars",
        awayTeam: "UNC Wilmington Seahawks",
        date: "Nov 15, 2025",
        time: "7:00 PM",
        venue: "TD Arena",
        location: "Charleston, SC",
        logo: "🏀"
    },
    {
        id: 2,
        homeTeam: "College of Charleston Cougars",
        awayTeam: "James Madison Dukes",
        date: "Nov 22, 2025",
        time: "6:30 PM",
        venue: "TD Arena",
        location: "Charleston, SC",
        logo: "🏀"
    },
    {
        id: 3,
        homeTeam: "The Citadel Bulldogs",
        awayTeam: "VMI Keydets",
        date: "Dec 3, 2025",
        time: "7:00 PM",
        venue: "McAlister Field House",
        location: "Charleston, SC",
        logo: "🏀"
    },
    {
        id: 4,
        homeTeam: "College of Charleston Cougars",
        awayTeam: "Charleston Southern Buccaneers",
        date: "Dec 10, 2025",
        time: "7:00 PM",
        venue: "TD Arena",
        location: "Charleston, SC",
        logo: "🏀"
    },
    {
        id: 5,
        homeTeam: "The Citadel Bulldogs",
        awayTeam: "Furman Paladins",
        date: "Jan 8, 2026",
        time: "6:00 PM",
        venue: "McAlister Field House",
        location: "Charleston, SC",
        logo: "🏀"
    },
    {
        id: 6,
        homeTeam: "College of Charleston Cougars",
        awayTeam: "Drexel Dragons",
        date: "Jan 15, 2026",
        time: "7:00 PM",
        venue: "TD Arena",
        location: "Charleston, SC",
        logo: "🏀"
    }
];

// Generate Basketball Seats Function
const generateBasketballSeats = () => {
    const sections = [];
    
    const lowerSections = [
        { name: 'Section 101', side: 'left', level: 'lower', rows: 15, seatsPerRow: 20, price: 45 },
        { name: 'Section 102', side: 'left', level: 'lower', rows: 15, seatsPerRow: 22, price: 55 },
        { name: 'Section 103', side: 'baseline', level: 'lower', rows: 12, seatsPerRow: 18, price: 40 },
        { name: 'Section 104', side: 'right', level: 'lower', rows: 15, seatsPerRow: 22, price: 55 },
        { name: 'Section 105', side: 'right', level: 'lower', rows: 15, seatsPerRow: 20, price: 45 },
        { name: 'Section 106', side: 'baseline', level: 'lower', rows: 12, seatsPerRow: 18, price: 40 },
    ];

    const upperSections = [
        { name: 'Section 201', side: 'left', level: 'upper', rows: 20, seatsPerRow: 24, price: 25 },
        { name: 'Section 202', side: 'left', level: 'upper', rows: 20, seatsPerRow: 26, price: 30 },
        { name: 'Section 203', side: 'baseline', level: 'upper', rows: 18, seatsPerRow: 22, price: 20 },
        { name: 'Section 204', side: 'right', level: 'upper', rows: 20, seatsPerRow: 26, price: 30 },
        { name: 'Section 205', side: 'right', level: 'upper', rows: 20, seatsPerRow: 24, price: 25 },
        { name: 'Section 206', side: 'baseline', level: 'upper', rows: 18, seatsPerRow: 22, price: 20 },
    ];

    [...lowerSections, ...upperSections].forEach(section => {
        const sectionSeats = [];
        for (let row = 1; row <= section.rows; row++) {
            for (let seat = 1; seat <= section.seatsPerRow; seat++) {
                const seatId = `${section.name}-R${row}-S${seat}`;
                const isSold = Math.random() > 0.75;
                sectionSeats.push({
                    id: seatId,
                    section: section.name,
                    row: row,
                    seat: seat,
                    sold: isSold,
                    price: section.price
                });
            }
        }
        sections.push({
            ...section,
            seats: sectionSeats
        });
    });

    return sections;
};

// Main App Component
const App = () => {
    const [view, setView] = useState('search');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [heldSeats, setHeldSeats] = useState(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [timer, setTimer] = useState(null);
    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);

    useEffect(() => {
        if (selectedEvent) {
            setSections(generateBasketballSeats());
        }
    }, [selectedEvent]);

    useEffect(() => {
        if (selectedSeats.length > 0 && !timer) {
            setTimer(300);
        }
    }, [selectedSeats.length]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(t => t - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            setSelectedSeats([]);
            setHeldSeats(new Set());
            alert('Time expired! Seats have been released.');
            setSelectedSection(null);
        }
    }, [timer]);

    const filteredGames = basketballGames.filter(game =>
        game.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.venue.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSeatClick = (seat) => {
        if (seat.sold) return;
        
        const seatId = seat.id;
        if (selectedSeats.some(s => s.id === seatId)) {
            setSelectedSeats(selectedSeats.filter(s => s.id !== seatId));
            const newHeld = new Set(heldSeats);
            newHeld.delete(seatId);
            setHeldSeats(newHeld);
        } else {
            setSelectedSeats([...selectedSeats, seat]);
            setHeldSeats(new Set([...heldSeats, seatId]));
        }
    };

    const handlePurchase = () => {
        setPurchaseComplete(true);
        setTimeout(() => {
            setPurchaseComplete(false);
            setSelectedSeats([]);
            setHeldSeats(new Set());
            setTimer(null);
            setSelectedSection(null);
            setView('search');
        }, 3000);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getTotalPrice = () => {
        return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    };

    // Search View
    if (view === 'search') {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8 px-6 shadow-lg">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-4xl font-bold mb-2">Charleston Basketball Tickets</h1>
                        <p className="text-blue-100">Find and book tickets for college basketball games</p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto p-6">
                    <div className="mb-8">
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Search />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by team or venue..."
                                className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-lg bg-white shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredGames.map(game => (
                            <div
                                key={game.id}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                                onClick={() => {
                                    setSelectedEvent(game);
                                    setView('arena');
                                }}
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center mb-4">
                                                <span className="text-4xl mr-4">{game.logo}</span>
                                                <div>
                                                    <div className="text-xl font-bold text-gray-900">{game.homeTeam}</div>
                                                    <div className="text-lg text-gray-600">vs {game.awayTeam}</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <Calendar />
                                                    {game.date}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock />
                                                    {game.time}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin />
                                                    {game.venue}
                                                </div>
                                            </div>
                                        </div>
                                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                            Select Seats
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Arena Overview View
    if (view === 'arena' && !selectedSection) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="max-w-7xl mx-auto p-4">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => {
                                    setSelectedSeats([]);
                                    setHeldSeats(new Set());
                                    setTimer(null);
                                    setView('search');
                                }}
                                className="flex items-center text-gray-600 hover:text-gray-900"
                            >
                                <ChevronLeft />
                                <span className="ml-1">Back to Games</span>
                            </button>
                            {timer && (
                                <div className="flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-lg font-semibold">
                                    <Clock />
                                    Time left: {formatTime(timer)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto p-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.homeTeam} vs {selectedEvent.awayTeam}</h2>
                                <div className="flex gap-6 text-sm text-gray-600">
                                    <span>{selectedEvent.date} • {selectedEvent.time}</span>
                                    <span>{selectedEvent.venue}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h3 className="text-xl font-bold text-center mb-8">Select a Section</h3>
                        
                        <div className="relative max-w-4xl mx-auto">
                            <div className="border-4 border-orange-600 bg-orange-50 rounded-lg p-8 relative" style={{minHeight: '400px'}}>
                                <div className="text-center text-orange-800 font-bold text-lg mb-4">BASKETBALL COURT</div>
                                
                                <div className="border-2 border-orange-400 h-64 relative">
                                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-orange-400"></div>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-orange-400 rounded-full"></div>
                                </div>

                                <div className="absolute -top-24 left-0 right-0 flex justify-around">
                                    {[6, 7, 8, 9, 10, 11].map((idx) => {
                                        const section = sections[idx];
                                        if (!section) return null;
                                        return (
                                            <button 
                                                key={idx}
                                                onClick={() => setSelectedSection(section)} 
                                                className="bg-purple-100 hover:bg-purple-200 border-2 border-purple-400 px-4 py-2 rounded font-semibold text-sm transition-colors"
                                            >
                                                {section.name.split(' ')[1]}<br/>${section.price}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="absolute top-8 -left-24 flex flex-col gap-2">
                                    {[0, 1].map((idx) => {
                                        const section = sections[idx];
                                        if (!section) return null;
                                        return (
                                            <button 
                                                key={idx}
                                                onClick={() => setSelectedSection(section)} 
                                                className="bg-blue-100 hover:bg-blue-200 border-2 border-blue-400 px-3 py-2 rounded font-semibold text-sm transition-colors"
                                            >
                                                {section.name.split(' ')[1]}<br/>${section.price}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="absolute top-8 -right-24 flex flex-col gap-2">
                                    {[3, 4].map((idx) => {
                                        const section = sections[idx];
                                        if (!section) return null;
                                        return (
                                            <button 
                                                key={idx}
                                                onClick={() => setSelectedSection(section)} 
                                                className="bg-blue-100 hover:bg-blue-200 border-2 border-blue-400 px-3 py-2 rounded font-semibold text-sm transition-colors"
                                            >
                                                {section.name.split(' ')[1]}<br/>${section.price}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="absolute -bottom-20 left-1/4 transform -translate-x-1/2">
                                    {sections[2] && (
                                        <button 
                                            onClick={() => setSelectedSection(sections[2])} 
                                            className="bg-blue-100 hover:bg-blue-200 border-2 border-blue-400 px-4 py-2 rounded font-semibold text-sm transition-colors"
                                        >
                                            {sections[2].name.split(' ')[1]}<br/>${sections[2].price}
                                        </button>
                                    )}
                                </div>
                                <div className="absolute -bottom-20 right-1/4 transform translate-x-1/2">
                                    {sections[5] && (
                                        <button 
                                            onClick={() => setSelectedSection(sections[5])} 
                                            className="bg-blue-100 hover:bg-blue-200 border-2 border-blue-400 px-4 py-2 rounded font-semibold text-sm transition-colors"
                                        >
                                            {sections[5].name.split(' ')[1]}<br/>${sections[5].price}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="mt-12 flex justify-center gap-8">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-blue-100 border-2 border-blue-400 rounded mr-2"></div>
                                    <span className="text-sm font-medium">Lower Bowl</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-purple-100 border-2 border-purple-400 rounded mr-2"></div>
                                    <span className="text-sm font-medium">Upper Bowl</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedSeats.length > 0 && (
                        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl p-6 z-50">
                            <div className="max-w-7xl mx-auto flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">{selectedSeats.length} seat(s) selected</div>
                                    <div className="font-bold text-lg">${getTotalPrice()}</div>
                                </div>
                                <button
                                    onClick={() => setView('payment')}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Seat Selection View
    if (view === 'arena' && selectedSection) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="max-w-7xl mx-auto p-4">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setSelectedSection(null)}
                                className="flex items-center text-gray-600 hover:text-gray-900"
                            >
                                <ChevronLeft />
                                <span className="ml-1">Back to Arena</span>
                            </button>
                            {timer && (
                                <div className="flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-lg font-semibold">
                                    <Clock />
                                    Time left: {formatTime(timer)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto p-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <h2 className="text-2xl font-bold mb-2">{selectedSection.name}</h2>
                        <div className="text-gray-600">Price per seat: <span className="font-bold text-blue-600">${selectedSection.price}</span></div>
                    </div>

                    <div className="bg-gray-800 text-white text-center py-3 rounded-t-lg mb-2 font-bold">
                        COURT ↓
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-x-auto">
                        <div className="inline-block min-w-full">
                            {Array.from({ length: selectedSection.rows }).map((_, rowIdx) => {
                                const rowNum = rowIdx + 1;
                                const rowSeats = selectedSection.seats.filter(s => s.row === rowNum);
                                
                                return (
                                    <div key={rowNum} className="flex items-center justify-center mb-2">
                                        <span className="w-12 text-center font-semibold text-gray-600 text-sm">Row {rowNum}</span>
                                        <div className="flex gap-1">
                                            {rowSeats.map(seat => {
                                                const isSelected = selectedSeats.some(s => s.id === seat.id);
                                                
                                                return (
                                                    <button
                                                        key={seat.id}
                                                        onClick={() => handleSeatClick(seat)}
                                                        disabled={seat.sold}
                                                        className={`w-8 h-8 rounded text-xs font-semibold transition-all ${
                                                            seat.sold ? 'bg-gray-300 text-gray-500 cursor-not-allowed' :
                                                            isSelected ? 'bg-blue-600 text-white scale-110 shadow-lg' :
                                                            'bg-green-500 text-white hover:bg-green-600'
                                                        }`}
                                                        title={`${selectedSection.name} - Row ${seat.row} - Seat ${seat.seat}`}
                                                    >
                                                        {seat.seat}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-gray-200">
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-green-500 rounded mr-2"></div>
                                <span className="text-sm">Available</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-blue-600 rounded mr-2"></div>
                                <span className="text-sm">Selected</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-gray-300 rounded mr-2"></div>
                                <span className="text-sm">Sold</span>
                            </div>
                        </div>
                    </div>

                    {selectedSeats.length > 0 && (
                        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl p-6 z-50">
                            <div className="max-w-7xl mx-auto flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">{selectedSeats.length} seat(s) selected</div>
                                    <div className="font-bold text-lg">${getTotalPrice()}</div>
                                </div>
                                <button
                                    onClick={() => setView('payment')}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Payment View
    if (view === 'payment') {
        if (purchaseComplete) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Purchase Complete!</h2>
                        <p className="text-gray-600 mb-4">Your tickets have been sent to your email</p>
                        <div className="bg-white rounded-xl p-6 inline-block shadow-lg">
                            <p className="text-sm text-gray-600 mb-2">Seats</p>
                            <p className="text-xl font-bold text-blue-600">
                                {selectedSeats.map(s => `${s.section} R${s.row}S${s.seat}`).join(', ')}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-3xl mx-auto p-6">
                    <button
                        onClick={() => setView('arena')}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
                    >
                        <ChevronLeft />
                        <span className="ml-1">Back to Seats</span>
                    </button>

                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Purchase</h2>

                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
                        <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Event</span>
                                <span className="font-semibold text-right">{selectedEvent.homeTeam} vs {selectedEvent.awayTeam}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Date & Time</span>
                                <span className="font-semibold">{selectedEvent.date} at {selectedEvent.time}</span>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-gray-600">Seats</span>
                                <span className="font-semibold text-right">
                                    {selectedSeats.map(s => `${s.section} R${s.row}S${s.seat}`).join(', ')}
                                </span>
                            </div>
                            <div className="border-t border-gray-200 pt-3 mt-3">
                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span className="text-blue-600">${getTotalPrice()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
                        <h3 className="font-bold text-lg mb-4">Payment Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                                <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="your.email@college.edu"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handlePurchase}
                        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg shadow-lg"
                    >
                        Complete Purchase - ${getTotalPrice()}
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        🔒 Your payment information is secure and encrypted
                    </p>
                </div>
            </div>
        );
    }
};

// Render the App
ReactDOM.render(<App />, document.getElementById('root'));