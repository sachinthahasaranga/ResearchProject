import pandas as pd
from sklearn.model_selection import train_test_split

def split_data(input_path, output_folder):
    """Splits the dataset into train, validation, and test sets."""
    data = pd.read_csv(input_path)
    train, temp = train_test_split(data, test_size=0.3, random_state=42)
    validation, test = train_test_split(temp, test_size=0.5, random_state=42)

    train.to_csv(f"{output_folder}/train.csv", index=False)
    validation.to_csv(f"{output_folder}/validation.csv", index=False)
    test.to_csv(f"{output_folder}/test.csv", index=False)
    print(f"Data split into train, validation, and test sets in {output_folder}")

if __name__ == "__main__":
    split_data('./data/processed/answers_processed.csv', './data/datasets/')
