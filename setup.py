from setuptools import setup, find_packages

setup(
    name="ITExpoProject",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "flask",
        "requests"
    ],
    python_requires=">=3.6",
)
