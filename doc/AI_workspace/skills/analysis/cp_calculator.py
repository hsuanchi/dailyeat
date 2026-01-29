def calculate_fish_oil_metrics(price, capsules, epa_per_serving, dha_per_serving, serving_size=1):
    """
    Calculate CP value and concentration metrics for Fish Oil products.
    
    Args:
        price (float): Total price of the product (e.g., 1380 or 936).
        capsules (int): Total number of capsules in the package.
        epa_per_serving (float): EPA amount in mg (e.g., 720).
        dha_per_serving (float): DHA amount in mg (e.g., 240).
        serving_size (int): Number of capsules per serving (default 1).
        
    Returns:
        dict: Calculated metrics including price per capsule, price per mg Omega-3, etc.
    """
    
    # Basic Calculations
    total_omega3_per_serving = epa_per_serving + dha_per_serving
    price_per_capsule = price / capsules
    
    # Normalize per capsule
    epa_per_capsule = epa_per_serving / serving_size
    dha_per_capsule = dha_per_serving / serving_size
    omega3_per_capsule = total_omega3_per_serving / serving_size
    
    # Cost Efficiency (CP Value)
    # How much does 1000mg of Omega-3 cost?
    cost_per_gram_omega3 = (price_per_capsule / omega3_per_capsule) * 1000
    
    # Daily Cost (assuming 1000mg Omega-3 target per day)
    # How many capsules to reach 1000mg?
    capsules_needed_for_1000mg = 1000 / omega3_per_capsule
    daily_cost_for_1000mg = capsules_needed_for_1000mg * price_per_capsule

    return {
        "price_per_capsule": round(price_per_capsule, 2),
        "omega3_per_capsule_mg": round(omega3_per_capsule, 1),
        "cost_per_gram_omega3": round(cost_per_gram_omega3, 1),
        "daily_cost_standardized": round(daily_cost_for_1000mg, 1)
    }

# Example Usage (BetterBio 5-box Data)
if __name__ == "__main__":
    # Test Policy: BetterBio 5-box set (Price $936 avg, 60 caps?) 
    # Actually 5 box total price around 4680? Let's assume input is per unit price in bundle.
    # Demo Data based on fish-oil-v3-demo.html
    
    print("--- BetterBio (5-Box Bundle Avg) ---")
    metrics = calculate_fish_oil_metrics(
        price=936,          # Avg price per box in bundle
        capsules=60, 
        epa_per_serving=576, # 80% * 720mg? No, data says 720mg EPA per serving (2 caps). 
                             # Let's check demo: "720mg EPA + 240mg DHA" per serving (usually 2 caps).
        dha_per_serving=240, 
        serving_size=2       # Usually daily dose is 2 capsules
    )
    print(metrics)
    
    print("\n--- MIHONG (Competitor) ---")
    # Hypothetical data
    metrics_m = calculate_fish_oil_metrics(
        price=16.2 * 60,    # Per capsule $16.2
        capsules=60,
        epa_per_serving=480,
        dha_per_serving=320,
        serving_size=2
    )
    print(metrics_m)
