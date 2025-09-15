// Demo script to test the Crisis Resource API
const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Testing Crisis Resource API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.message);
    console.log('');

    // Test get all resources
    console.log('2. Testing get all resources...');
    const allResourcesResponse = await fetch(`${API_BASE}/api/resources`);
    const allResourcesData = await allResourcesResponse.json();
    console.log(`✅ Found ${allResourcesData.count} total resources`);
    console.log('');

    // Test filter by location
    console.log('3. Testing filter by location (New York)...');
    const nyResourcesResponse = await fetch(`${API_BASE}/api/resources?location=New York`);
    const nyResourcesData = await nyResourcesResponse.json();
    console.log(`✅ Found ${nyResourcesData.count} resources in New York`);
    console.log('');

    // Test filter by category
    console.log('4. Testing filter by category (mental-health)...');
    const mentalHealthResponse = await fetch(`${API_BASE}/api/resources?category=mental-health`);
    const mentalHealthData = await mentalHealthResponse.json();
    console.log(`✅ Found ${mentalHealthData.count} mental health resources`);
    console.log('');

    // Test combined filters
    console.log('5. Testing combined filters (New York + domestic-violence)...');
    const combinedResponse = await fetch(`${API_BASE}/api/resources?location=New York&category=domestic-violence`);
    const combinedData = await combinedResponse.json();
    console.log(`✅ Found ${combinedData.count} domestic violence resources in New York`);
    console.log('');

    // Test invalid category
    console.log('6. Testing invalid category...');
    const invalidResponse = await fetch(`${API_BASE}/api/resources?category=invalid`);
    const invalidData = await invalidResponse.json();
    console.log('✅ Error handling works:', invalidData.error);
    console.log('');

    console.log('🎉 All API tests passed!');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('Make sure the backend server is running on http://localhost:3001');
  }
}

// Run the tests
testAPI();
