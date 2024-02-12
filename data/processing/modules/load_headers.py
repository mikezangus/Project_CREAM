import os
import sys

modules_dir = os.path.dirname(__file__)
processing_dir = os.path.dirname(modules_dir)
data_dir = os.path.dirname(processing_dir)
sys.path.append(data_dir)
from directories import get_headers_dir


def load_headers(file_type: str) -> list:
    dir = get_headers_dir()
    path = os.path.join(dir, f"{file_type}_header_file.csv")
    with open(path, "r") as header_file:
        headers = header_file.readline().strip().split(",")
    return headers
