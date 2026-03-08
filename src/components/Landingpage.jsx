import React from 'react';
import { Link } from 'react-router-dom';
import LandingNavbar from './LandingNavbar';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <LandingNavbar />

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Complete Your Daily <span className="text-green-200">Protein</span> Without Cooking
              </h1>
              <p className="text-xl mb-8 text-green-100 leading-relaxed">
                Affordable high-protein ready-to-eat meals designed for students, gym lovers, and busy professionals.
                Get your daily protein goals met with our nutritious meal boxes delivered to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="animate-fade-in-right">
              <img
                src="https://images.unsplash.com/photo-1546793665-c74683f339c1"
                alt="Healthy protein meal boxes"
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Protein Problem</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Millions struggle to meet their daily protein needs due to busy lifestyles and unhealthy eating habits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-red-200">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🍚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Carb Heavy Diets</h3>
              <p className="text-gray-600 leading-relaxed">
                Traditional Indian meals are rich in carbohydrates but lack sufficient protein content,
                leading to incomplete nutrition and energy crashes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-200">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expensive Options</h3>
              <p className="text-gray-600 leading-relaxed">
                High-protein meals on food delivery apps cost ₹300-₹450, making consistent healthy eating
                unaffordable for students and young professionals.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-200">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Busy Lifestyles</h3>
              <p className="text-gray-600 leading-relaxed">
                Students and working professionals don't have time to cook nutritious meals,
                leading to reliance on unhealthy fast food and processed snacks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Solution</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Protein Box delivers affordable, high-protein ready-to-eat meals that fit your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Calculator</h3>
              <p className="text-gray-600 text-sm">Calculate your exact protein needs based on your goals and lifestyle</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">🥘</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready-to-Eat Meals</h3>
              <p className="text-gray-600 text-sm">Fresh, nutritious meal boxes prepared in our cloud kitchen</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Affordable Plans</h3>
              <p className="text-gray-600 text-sm">Subscription plans starting from just ₹199 per meal</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">🚚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Same-day delivery from our network of cloud kitchens</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meal Box Preview */}
      <section id="menu" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Protein Boxes</h2>
            <p className="text-xl text-gray-600">Choose from our delicious high-protein meal options</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d"
                alt="Paneer Power Box"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Paneer Power Box</h3>
                <p className="text-green-600 font-semibold text-lg mb-3">35g Protein</p>
                <p className="text-gray-600 mb-4">Grilled paneer with quinoa, mixed vegetables, and herbs</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">₹249</span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
                alt="Chicken Muscle Box"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Chicken Muscle Box</h3>
                <p className="text-green-600 font-semibold text-lg mb-3">45g Protein</p>
                <p className="text-gray-600 mb-4">Grilled chicken breast with brown rice and steamed broccoli</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">₹299</span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
                alt="Soya Vegan Box"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Soya Vegan Box</h3>
                <p className="text-green-600 font-semibold text-lg mb-3">32g Protein</p>
                <p className="text-gray-600 mb-4">Tofu stir-fry with mixed vegetables and quinoa</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">₹229</span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Our Platform Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-r from-gray-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Your protein journey in 5 simple steps</p>
          </div>

          {/* Interactive Flow Timeline */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {/* Step 1 */}
              <div className="group text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                    1
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Create Profile</h3>
                  <p className="text-xs text-gray-600">Sign up & set your goals</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                    2
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">AI Analysis</h3>
                  <p className="text-xs text-gray-600">BMI & protein calculation</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                    3
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Personalized Meals</h3>
                  <p className="text-xs text-gray-600">Custom meal recommendations</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="group text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                    4
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Order & Delivery</h3>
                  <p className="text-xs text-gray-600">Fresh protein boxes delivered</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="group text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                    5
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Track Progress</h3>
                  <p className="text-xs text-gray-600">Monitor your protein intake</p>
                </div>
              </div>
            </div>

            {/* Mobile Arrows */}
            <div className="md:hidden flex justify-center mt-8 space-x-4">
              <div className="text-2xl text-green-500 animate-bounce">↓</div>
              <div className="text-2xl text-green-500 animate-bounce" style={{animationDelay: '0.1s'}}>↓</div>
              <div className="text-2xl text-green-500 animate-bounce" style={{animationDelay: '0.2s'}}>↓</div>
              <div className="text-2xl text-green-500 animate-bounce" style={{animationDelay: '0.3s'}}>↓</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Start Completing Your Daily Protein Today</h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of students and professionals who have transformed their nutrition with Protein Box
          </p>
          <Link to="/login" className="bg-white text-green-600 px-10 py-4 rounded-lg font-bold text-xl hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-xl font-bold">
                  🥗
                </div>
                <span className="text-2xl font-bold">ProteinBox</span>
              </div>
              <p className="text-gray-400 mb-4">
                Solving protein poverty among students and working professionals with affordable,
                high-protein ready-to-eat meals.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">📘</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">🐦</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">📷</a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Menu</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Protein Box. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;